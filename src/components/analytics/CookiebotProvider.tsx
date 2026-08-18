import Script from "next/script";

/**
 * Cookiebot CMP + Google Consent Mode v2 defaults. Both scripts use
 * `beforeInteractive`, so Next hoists them before hydration and before
 * afterInteractive trackers (GTM / Meta Pixel / Clarity):
 *  1. Google tags see a "denied" consent default the instant they load.
 *  2. Cookiebot's auto-blocking script is active before those trackers inject
 *     third-party <script> tags, so it can intercept them.
 *
 * Must be rendered from the root layout <body> (not a manual <head>) —
 * Cookiebot's Next.js guide: wrapping beforeInteractive Scripts in an
 * explicit <head> causes a hydration mismatch when Cookiebot rewrites tags.
 */
export function CookiebotProvider() {
  const cbid = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  if (!cbid) return null;

  return (
    <>
      <Script id="gcm-default-consent" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', false);`}
      </Script>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={cbid}
        data-blockingmode="auto"
        strategy="beforeInteractive"
      />
    </>
  );
}
