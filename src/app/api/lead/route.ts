import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types";
import { buildOfferData } from "@/lib/offer";
import { sendWelcomeEmail } from "@/lib/email/send-offer";
import { normalizePhone, normalizePostalCode } from "@/lib/utils";
import { createCrmLead } from "@/lib/crm/leads";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Partial<LeadPayload>;

    const postalCode =
      typeof data?.postalCode === "string" ? normalizePostalCode(data.postalCode) : null;
    const phone = typeof data?.phone === "string" ? normalizePhone(data.phone) : null;

    if (!data?.name || !data?.email || !phone || !postalCode || !data?.consent) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const payload = { ...data, postalCode, phone } as LeadPayload;

    // eslint-disable-next-line no-console
    console.info("[lead] received", {
      name: payload.name,
      email: payload.email,
      preferredModel: payload.preferredModel,
      location: payload.location,
      postalCode: payload.postalCode,
      locale: payload.locale,
      sourceLabel: payload.sourceLabel,
    });

    // CRM and welcome e-mail run independently; a failure in one must never
    // block the other or the customer's form submission.
    const crm = createCrmLead(payload)
      .then((crmLead) => {
        // eslint-disable-next-line no-console
        console.info("[lead] saved in CRM", {
          externalSubmissionId: crmLead.externalSubmissionId,
          inquiryId: crmLead.inquiryId,
        });
        return crmLead;
      })
      .catch((crmErr) => {
        // eslint-disable-next-line no-console
        console.error("[lead] CRM save failed", crmErr);
        return null;
      });

    // Send the welcome e-mail with the VSL link (no offer PDF) via Resend.
    const email = (async () => {
      if (!process.env.RESEND_API_KEY) return;
      try {
        const offerData = buildOfferData(payload);
        const result = await sendWelcomeEmail({
          to: payload.email,
          data: offerData,
        });
        // eslint-disable-next-line no-console
        console.info("[lead] welcome email sent", {
          to: payload.email,
          model: offerData.model.id,
          id: result?.data?.id,
        });
      } catch (emailErr) {
        // eslint-disable-next-line no-console
        console.error("[lead] email send failed", emailErr);
      }
    })();

    await Promise.all([crm, email]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
