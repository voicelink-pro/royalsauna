"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useVoiceAgent } from "@/components/voice/VoiceAgentProvider";

/**
 * Launcher + session panel for the RoyalSauna assistant.
 * Idle state is a rectangular card; Rozmawiaj / Czat start a session immediately.
 */
export function VoiceAgentPlaceholder({ dict }: { dict: Dictionary }) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_AI_AGENT === "true";
  const {
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
  } = useVoiceAgent();

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStickyCtaVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (status === "connecting" || status === "connected") setOpen(true);
  }, [status]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  if (!enabled) return null;

  const inSession = status === "connecting" || status === "connected";
  const showComposer = status === "connected" && channel === "text";
  const statusLabel =
    status === "connecting"
      ? dict.widgets.voiceConnecting
      : status === "error"
        ? dict.widgets.voiceError
        : status === "ended"
          ? dict.widgets.voiceEnded
          : channel === "voice" && mode === "speaking"
            ? dict.widgets.voiceSpeaking
            : channel === "voice"
              ? dict.widgets.voiceListening
              : dict.widgets.chatTitle;

  function submitDraft() {
    const text = draft.trim();
    if (!text) return;
    sendMessage(text);
    setDraft("");
  }

  return (
    <div
      className={cn(
        "fixed right-4 z-50 flex flex-col items-end gap-3 sm:right-5",
        stickyCtaVisible ? "bottom-24 lg:bottom-5" : "bottom-5",
      )}
    >
      {open && (
        <div
          role="dialog"
          aria-label={dict.widgets.voiceTitle}
          className="flex w-[min(calc(100vw-2rem),400px)] max-h-[min(70vh,560px)] flex-col overflow-hidden rounded-2xl border border-sand-300 bg-ivory shadow-soft"
        >
          <div className="flex items-center gap-2 border-b border-sand-200 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg leading-tight text-bark-700">
                {dict.widgets.voiceTitle}
              </p>
              {inSession && (
                <p className="mt-0.5 text-xs text-bark-500">{statusLabel}</p>
              )}
            </div>
            {status === "connected" && channel === "text" && (
              <button
                type="button"
                onClick={() => switchToVoice()}
                className="shrink-0 rounded-md border border-brass bg-bark-700 px-3 py-1.5 text-xs font-medium text-ivory"
              >
                {dict.widgets.switchToTalk}
              </button>
            )}
            {status === "connected" && channel === "voice" && (
              <button
                type="button"
                onClick={() => switchToChat()}
                className="shrink-0 rounded-md border border-sand-300 bg-ivory px-3 py-1.5 text-xs font-medium text-bark-700"
              >
                {dict.widgets.switchToType}
              </button>
            )}
            {inSession && (
              <button
                type="button"
                onClick={() => stop()}
                className="shrink-0 text-xs font-medium text-bark-500 underline decoration-brass/70 underline-offset-4 hover:text-bark-800"
              >
                {dict.widgets.voiceEnd}
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.widgets.closePanel}
              className="shrink-0 text-bark-400 hover:text-bark-700"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {status === "idle" && (
              <Picker dict={dict} onChat={startChat} onTalk={startVoice} />
            )}

            {status === "error" && (
              <div className="space-y-3">
                <p className="text-sm text-red-700">{dict.widgets.voiceError}</p>
                <Picker dict={dict} onChat={startChat} onTalk={startVoice} />
              </div>
            )}

            {status === "ended" && (
              <div className="space-y-4">
                <Transcript messages={messages} />
                <p className="text-sm text-bark-500">{dict.widgets.voiceEnded}</p>
                <Picker dict={dict} onChat={startChat} onTalk={startVoice} />
              </div>
            )}

            {(status === "connecting" || status === "connected") && (
              <div className="space-y-3">
                {status === "connecting" && messages.length === 0 && (
                  <p className="text-sm text-bark-500">
                    {dict.widgets.voiceConnecting}
                  </p>
                )}
                <Transcript messages={messages} />
                {status === "connected" && channel === "voice" && (
                  <p className="text-center text-xs font-medium uppercase tracking-widest text-clay-500">
                    {mode === "speaking"
                      ? dict.widgets.voiceSpeaking
                      : dict.widgets.voiceListening}
                  </p>
                )}
              </div>
            )}
          </div>

          {showComposer && (
            <form
              className="flex gap-2 border-t border-sand-200 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                submitDraft();
              }}
            >
              <input
                type="text"
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  sendActivity();
                }}
                placeholder={dict.widgets.chatPlaceholder}
                className="h-10 min-w-0 flex-1 rounded-md border border-sand-300 bg-ivory px-3 text-sm text-bark-700 placeholder:text-bark-400/70 focus-visible:border-clay-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-clay-500/20"
              />
              <Button type="submit" size="sm" disabled={!draft.trim()}>
                {dict.widgets.send}
              </Button>
            </form>
          )}
        </div>
      )}

      {!open && !inSession && (
        <div className="w-[min(calc(100vw-2rem),300px)] rounded-2xl border border-sand-300 bg-ivory p-4 shadow-soft">
          <p className="font-serif text-lg leading-snug text-bark-700">
            {dict.widgets.launcherTitle}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setOpen(true);
                void startVoice();
              }}
            >
              <MicIcon />
              {dict.widgets.launcherTalk}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setOpen(true);
                void startChat();
              }}
            >
              <ChatIcon />
              {dict.widgets.launcherChat}
            </Button>
          </div>
        </div>
      )}

      {!open && inSession && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={dict.widgets.sessionExpand}
          className="flex w-[min(calc(100vw-2rem),280px)] items-center justify-between gap-3 rounded-2xl border border-brass bg-bark-700 px-4 py-3 text-left text-ivory shadow-soft"
        >
          <span>
            <span className="block font-serif text-base leading-tight">
              {dict.widgets.sessionOpen}
            </span>
            <span className="mt-0.5 block text-xs text-ivory/80">
              {statusLabel}
            </span>
          </span>
          <span className="shrink-0 text-xs font-medium underline underline-offset-4">
            {dict.widgets.sessionExpand}
          </span>
        </button>
      )}
    </div>
  );
}

function Picker({
  dict,
  onChat,
  onTalk,
}: {
  dict: Dictionary;
  onChat: () => void;
  onTalk: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-bark-500">{dict.widgets.pickerLead}</p>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onTalk}
          className="flex flex-col items-start gap-2 rounded-2xl border border-sand-300 bg-sand-100/50 p-4 text-left transition-colors hover:border-brass hover:bg-sand-100"
        >
          <MicIcon />
          <span className="font-serif text-lg text-bark-700">
            {dict.widgets.talkChoice}
          </span>
          <span className="text-xs text-bark-500">
            {dict.widgets.talkChoiceHint}
          </span>
        </button>
        <button
          type="button"
          onClick={onChat}
          className="flex flex-col items-start gap-2 rounded-2xl border border-sand-300 bg-sand-100/50 p-4 text-left transition-colors hover:border-brass hover:bg-sand-100"
        >
          <ChatIcon />
          <span className="font-serif text-lg text-bark-700">
            {dict.widgets.chatChoice}
          </span>
          <span className="text-xs text-bark-500">
            {dict.widgets.chatChoiceHint}
          </span>
        </button>
      </div>
    </div>
  );
}

function Transcript({
  messages,
}: {
  messages: { id: string; role: "user" | "agent"; text: string }[];
}) {
  if (messages.length === 0) return null;
  return (
    <div className="space-y-2">
      {messages.map((item) => (
        <div
          key={item.id}
          className={cn(
            "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
            item.role === "user"
              ? "ml-auto bg-bark-700 text-ivory"
              : "mr-auto border border-sand-200 bg-white text-bark-700",
          )}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

function MicIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
