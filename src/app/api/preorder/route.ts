// src/app/api/preorder/route.ts
//
// POST /api/preorder
// 1. Validates form fields
// 2. Creates a Razorpay order (server-side, secret key stays safe)
// 3. Returns { orderId, amount, currency, keyId } to the client
//
// After the client completes payment, Razorpay calls your webhook
// (src/app/api/preorder/webhook/route.ts) to confirm and save the order.

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay server keys are missing" },
        { status: 500 }
      );
    }
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json();
    const {
      submissionId,
      owner,
      pet,
      email,
      phone,
      breed,
      city,
      colour,
      source,
      rank,
      referralCode,
    } = body;

    // Basic validation
    if (
      !submissionId ||
      !owner?.trim() ||
      !pet?.trim() ||
      !email?.trim() ||
      !phone?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!ObjectId.isValid(submissionId)) {
      return NextResponse.json(
        { error: "Invalid submission ID" },
        { status: 400 },
      );
    }

    // Create Razorpay order (₹500 = 50000 paise)
    const order = await razorpay.orders.create({
      amount: 100,
      currency: "INR",
      receipt: `myperro_spot_${rank}_${Date.now()}`,
      notes: {
        owner_name: owner,
        pet_name: pet,
        email,
        phone,
        breed: breed || "",
        city: city || "",
        collar_colour: colour || "",
        source: source || "",
        rank: String(rank),
        referral_code: referralCode || "",
      },
    });
    const { db } = await connectToDatabase();
    const updateResult = await db.collection("submissions").updateOne(
      { _id: new ObjectId(submissionId) },
      {
        $set: {
          razorpayOrderId: order.id,
          updatedAt: new Date(),
        },
      },
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    console.error("[preorder] Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 },
    );
  }
}
