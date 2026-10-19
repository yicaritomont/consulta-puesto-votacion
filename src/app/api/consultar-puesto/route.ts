import { NextResponse } from "next/server";
import { lookupVotingPlace } from "@/lib/placapi";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const document = String(body.document ?? "").replace(/\D/g, "");
    const result = await lookupVotingPlace(document);
    return NextResponse.json(result, {
      status: result.ok
        ? 200
        : result.code === "NOT_FOUND"
          ? 404
          : result.code === "INVALID_REQUEST"
            ? 400
            : result.code === "RATE_LIMITED"
              ? 429
              : 503,
    });
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_REQUEST", message: "Solicitud inválida." },
      { status: 400 },
    );
  }
}
