import { NextResponse } from "next/server";

// No submission destination (database, email service, spreadsheet, etc.) has
// been chosen for this form yet. This route exists so the client can submit
// through the website rather than a fake success, but it intentionally
// fails until a real destination is wired up here.
export async function POST() {
  return NextResponse.json(
    { error: "Application submissions are not yet configured for this site." },
    { status: 501 },
  );
}
