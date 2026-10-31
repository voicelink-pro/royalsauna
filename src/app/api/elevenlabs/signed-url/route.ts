import { NextResponse } from "next/server";

/**
 * Issues a short-lived ElevenLabs Conversational AI signed URL.
 * The API key stays on the server — the browser only ever sees the URL.
 */
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "Voice agent is not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
      {
        method: "GET",
        headers: { "xi-api-key": apiKey },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to start voice session" },
        { status: 500 },
      );
    }

    const body = (await res.json()) as { signed_url?: string };
    if (!body.signed_url) {
      return NextResponse.json(
        { error: "Failed to start voice session" },
        { status: 500 },
      );
    }

    return NextResponse.json({ signedUrl: body.signed_url });
  } catch {
    return NextResponse.json(
      { error: "Failed to start voice session" },
      { status: 500 },
    );
  }
}
