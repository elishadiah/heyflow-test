import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    // Optional: validate signature if Heyflow supports it

    console.log("Heyflow submission:", body);

    // Save to database
    // await db.leads.create({ data: body });

    return NextResponse.json({ success: true });
}