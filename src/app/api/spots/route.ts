import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.BACKEND_URL}/spots/status`);

  const data = await res.json();

  return NextResponse.json(data);
}
