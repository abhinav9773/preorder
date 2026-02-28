import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend";

export async function GET() {
  try {
    const res = await fetch(`${getBackendBaseUrl()}/spots/status`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch spots status from backend." },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to backend for spots status." },
      { status: 502 },
    );
  }
}
