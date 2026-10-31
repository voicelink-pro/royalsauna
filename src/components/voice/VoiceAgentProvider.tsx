"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Conversation } from "@elevenlabs/client";
import { voiceClientTools } from "@/lib/voice/client-tools";
import { setVoiceRouterPush } from "@/lib/voice/navigation-bridge";
import {
  localeFromPath,
  pageKeyFromPath,
} from "@/lib/voice/page-map";

export type VoiceStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "error"
  | "ended";
export type VoiceMode = "listening" | "speaking";
export type SessionChannel = "text" | "voice";

export type ChatMessage = {
  id: string;
  role: "user" | "agent";
  text: string;
  eventId?: number;
};

type Session = Awaited<ReturnType<typeof Conversation.startSession>>;

type VoiceAgentApi = {
  status: VoiceStatus;
  mode: VoiceMode;
  channel: SessionChannel | null;
  messages: ChatMessage[];
  startChat: () => Promise<void>;
  startVoice: () => Promise<void>;
  switchToVoice: () => Promise<void>;
  switchToChat: () => void;
  sendMessage: (text: string) => void;
  sendActivity: () => void;
  stop: () => Promise<void>;
};

const VoiceAgentContext = createContext<VoiceAgentApi>({
  status: "idle",
  mode: "listening",
  channel: null,
  messages: [],
  startChat: async () => {},
  startVoice: async () => {},
  switchToVoice: async () => {},
  switchToChat: () => {},
  sendMessage: () => {},
  sendActivity: () => {},
  stop: async () => {},
});

export function useVoiceAgent() {
  return useContext(VoiceAgentContext);
}

function sessionDynamicVars(pathname: string) {
  return {
    locale: localeFromPath(pathname),
    current_path: pathname,
    page_key: pageKeyFromPath(pathname),
  };
}

function getTextToVoiceUpgrade(
  conversation: Session,
): (() => Promise<unknown>) | null {
  const maybe = conversation as Session & {
    upgradeFromTextConversation?: () => Promise<unknown>;
    getConversation?: () => {
      upgradeFromTextConversation?: () => Promise<unknown>;
    };
  };
  if (typeof maybe.upgradeFromTextConversation === "function") {
    return () => maybe.upgradeFromTextConversation!();
  }
  const inner = maybe.getConversation?.();
  if (inner && typeof inner.upgradeFromTextConversation === "function") {
    return () => inner.upgradeFromTextConversation!();
  }
  return null;
}

/**
 * Holds the ElevenLabs Conversation instance at the root so client-side
 * navigation (including PL↔EN) does not tear down the session.
 */
export function VoiceAgentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const conversationRef = useRef<Session | null>(null);
  const startingRef = useRef(false);
  const upgradingRef = useRef(false);
  const messageSeq = useRef(0);

  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [mode, setMode] = useState<VoiceMode>("listening");
  const [channel, setChannel] = useState<SessionChannel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const modeRef = useRef<VoiceMode>("listening");
  modeRef.current = mode;

  useEffect(() => {
    setVoiceRouterPush((href) => {
      router.push(href);
    });
    return () => setVoiceRouterPush(null);
  }, [router]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (!conversation || status !== "connected") return;
    const vars = sessionDynamicVars(pathname);
    try {
      conversation.sendContextualUpdate(
        `User is now on ${pathname} (page_key=${vars.page_key}, locale=${vars.locale}). Consider this for the next response, but do not announce this update.`,
      );
    } catch {
      /* SDK may not accept updates after a closing session */
    }
  }, [pathname, status]);

  const pushMessage = useCallback(
    (role: ChatMessage["role"], text: string, eventId?: number) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => {
        if (eventId != null) {
          const index = prev.findIndex((item) => item.eventId === eventId);
          if (index >= 0) {
            const next = [...prev];
            next[index] = { ...next[index], text: trimmed };
            return next;
          }
        }
        const last = prev[prev.length - 1];
        if (last && last.role === role && last.text === trimmed) return prev;
        messageSeq.current += 1;
        return [
          ...prev,
          {
            id: `m-${messageSeq.current}`,
            role,
            text: trimmed,
            eventId,
          },
        ];
      });
    },
    [],
  );

  const attachSessionCallbacks = useCallback(
    (kind: SessionChannel) => ({
      onConnect: () => {
        setStatus("connected");
        setChannel(kind);
      },
      onDisconnect: (details: { reason: string }) => {
        if (upgradingRef.current) return;
        conversationRef.current = null;
        startingRef.current = false;
        setMode("listening");
        if (details.reason === "error") {
          setStatus("error");
          return;
        }
        setStatus("ended");
        setChannel(null);
      },
      onError: () => {
        if (upgradingRef.current) return;
        setStatus("error");
      },
      onModeChange: ({ mode: next }: { mode: string }) => {
        const speaking = next === "speaking";
        setMode(speaking ? "speaking" : "listening");
        if (kind === "voice") {
          try {
            conversationRef.current?.setMicMuted(speaking);
          } catch {
            /* text session or closing session */
          }
        }
      },
      onMessage: ({
        message,
        role,
        source,
        event_id,
      }: {
        message: string;
        role?: "user" | "agent";
        source?: "user" | "ai";
        event_id?: number;
      }) => {
        const isUser = role === "user" || source === "user";
        pushMessage(isUser ? "user" : "agent", message, event_id);
      },
    }),
    [pushMessage],
  );

  const fetchSignedUrl = useCallback(async () => {
    const res = await fetch("/api/elevenlabs/signed-url");
    if (!res.ok) throw new Error("signed-url");
    const body = (await res.json()) as { signedUrl?: string };
    if (!body.signedUrl) throw new Error("signed-url");
    return body.signedUrl;
  }, []);

  const endSessionQuietly = useCallback(async () => {
    const conversation = conversationRef.current;
    conversationRef.current = null;
    if (!conversation) return;
    try {
      await conversation.endSession();
    } catch {
      /* already closed */
    }
  }, []);

  const stop = useCallback(async () => {
    startingRef.current = false;
    upgradingRef.current = false;
    await endSessionQuietly();
    setMode("listening");
    setChannel(null);
    setStatus("ended");
  }, [endSessionQuietly]);

  const startChat = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;
    setMessages([]);
    setStatus("connecting");
    setMode("listening");
    setChannel("text");

    try {
      await endSessionQuietly();
      const signedUrl = await fetchSignedUrl();
      const path = pathnameRef.current;
      const conversation = await Conversation.startSession({
        signedUrl,
        clientTools: voiceClientTools,
        dynamicVariables: sessionDynamicVars(path),
        textOnly: true,
        overrides: { conversation: { textOnly: true } },
        ...attachSessionCallbacks("text"),
      });
      conversationRef.current = conversation;
    } catch {
      conversationRef.current = null;
      setChannel(null);
      setStatus("error");
    } finally {
      startingRef.current = false;
    }
  }, [attachSessionCallbacks, endSessionQuietly, fetchSignedUrl]);

  const startVoice = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;
    if (!upgradingRef.current) setMessages([]);
    setStatus("connecting");
    setMode("listening");
    setChannel("voice");

    try {
      const permission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      permission.getTracks().forEach((track) => track.stop());

      if (!upgradingRef.current) await endSessionQuietly();

      const signedUrl = await fetchSignedUrl();
      const path = pathnameRef.current;
      const conversation = await Conversation.startSession({
        signedUrl,
        clientTools: voiceClientTools,
        dynamicVariables: sessionDynamicVars(path),
        ...attachSessionCallbacks("voice"),
      });
      conversationRef.current = conversation;
      if (modeRef.current === "speaking") {
        try {
          conversation.setMicMuted(true);
        } catch {
          /* ignore */
        }
      }
    } catch {
      conversationRef.current = null;
      setChannel(null);
      setStatus("error");
    } finally {
      startingRef.current = false;
      upgradingRef.current = false;
    }
  }, [attachSessionCallbacks, endSessionQuietly, fetchSignedUrl]);

  const switchToVoice = useCallback(async () => {
    const conversation = conversationRef.current;
    if (channel === "voice" && conversation) {
      try {
        conversation.setMicMuted(false);
      } catch {
        /* text session has a no-op mute */
      }
      setChannel("voice");
      setMode("listening");
      return;
    }

    const upgrade = conversation ? getTextToVoiceUpgrade(conversation) : null;
    if (upgrade) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
          s.getTracks().forEach((track) => track.stop());
        });
        await upgrade();
        setChannel("voice");
        setMode("listening");
        return;
      } catch {
        /* fall through to a fresh voice session */
      }
    }

    upgradingRef.current = true;
    await endSessionQuietly();
    await startVoice();
  }, [channel, endSessionQuietly, startVoice]);

  const switchToChat = useCallback(() => {
    const conversation = conversationRef.current;
    if (conversation) {
      try {
        conversation.setMicMuted(true);
      } catch {
        /* ignore */
      }
    }
    setChannel("text");
  }, []);

  const sendMessage = useCallback((text: string) => {
    const conversation = conversationRef.current;
    const trimmed = text.trim();
    if (!conversation || !trimmed) return;
    pushMessage("user", trimmed);
    conversation.sendUserMessage(trimmed);
  }, [pushMessage]);

  const sendActivity = useCallback(() => {
    try {
      conversationRef.current?.sendUserActivity();
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    return () => {
      const conversation = conversationRef.current;
      conversationRef.current = null;
      if (conversation) {
        conversation.endSession().catch(() => {});
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      status,
      mode,
      channel,
      messages,
      startChat,
      startVoice,
      switchToVoice,
      switchToChat,
      sendMessage,
      sendActivity,
      stop,
    }),
    [
      status,
      mode,
      channel,
      messages,
      startChat,
      startVoice,
      switchToVoice,
      switchToChat,
      sendMessage,
      sendActivity,
      stop,
    ],
  );

  return (
    <VoiceAgentContext.Provider value={value}>
      {children}
    </VoiceAgentContext.Provider>
  );
}
