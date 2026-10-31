type PushFn = (href: string) => void;

let pushImpl: PushFn | null = null;

/** Registers Next.js `router.push` so client tools never touch `window.location`. */
export function setVoiceRouterPush(fn: PushFn | null) {
  pushImpl = fn;
}

export function voiceRouterPush(href: string): boolean {
  if (!pushImpl) return false;
  pushImpl(href);
  return true;
}
