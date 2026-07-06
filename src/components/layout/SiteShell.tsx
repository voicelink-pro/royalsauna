import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ChatWidgetPlaceholder } from "@/components/widgets/ChatWidgetPlaceholder";
import { VoiceAgentPlaceholder } from "@/components/widgets/VoiceAgentPlaceholder";
import { CookieBanner } from "@/components/layout/CookieBanner";

/**
 * Shared site chrome (header, footer, sticky CTA, future AI widgets) wrapped
 * around every page for a given locale.
 */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.common.skipToContent}
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <MobileStickyCTA locale={locale} dict={dict} />
      <ChatWidgetPlaceholder dict={dict} />
      <VoiceAgentPlaceholder dict={dict} />
      <CookieBanner locale={locale} dict={dict} />
    </>
  );
}
