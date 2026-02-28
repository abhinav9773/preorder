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
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
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

    // Basic server-side validation
    if (!owner?.trim() || !pet?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!submissionId || !ObjectId.isValid(submissionId)) {
      return NextResponse.json(
        { error: "Invalid submission ID" },
        { status: 400 },
      );
    }

    // Create Razorpay order — amount in paise (₹500 = 50000 paise)
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
    
    // Link Razorpay order with the already-created submission record.
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
      amount: order.amount, // 50000
      currency: order.currency, // "INR"
      keyId: process.env.RAZORPAY_KEY_ID, // public key — safe to send to client
    });
  } catch (err: any) {
    console.error("[preorder] Razorpay order creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 },
    );
  }
}
