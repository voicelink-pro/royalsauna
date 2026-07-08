import Script from "next/script";

/**
 * Cookiebot CMP + Google Consent Mode v2 defaults. Both scripts use
 * `beforeInteractive`, so they always execute before the GTM component
 * (`@next/third-parties`, `afterInteractive`) and MetaPixelProvider/
 * ClarityProvider in <head> — regardless of where those are placed in the
 * tree — so that:
 *  1. Google tags see a "denied" consent default the instant they load.
 *  2. Cookiebot's auto-blocking script is active before GTM/Pixel/Clarity
 *     inject their own third-party <script> tags, so it can intercept them.
 *
 * The default-consent snippet has no `src` and isn't a tracker Cookiebot's
 * auto-blocker recognises, so it always runs unblocked — no need (and, with
 * next/script's beforeInteractive bootstrap, no safe way) to mark it with a
 * custom `data-cookieconsent` attribute, which caused a hydration mismatch.
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
