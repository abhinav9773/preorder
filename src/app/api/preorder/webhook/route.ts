// src/app/api/preorder/webhook/route.ts
//
// Razorpay calls this URL after every payment event.
// Set this URL in your Razorpay Dashboard → Webhooks:
//   https://yourdomain.com/api/preorder/webhook
//
// This handler:
// 1. Verifies the webhook signature (prevents fake calls)
// 2. On payment.captured → saves the order to your DB / sends confirmation email
//
// Add RAZORPAY_WEBHOOK_SECRET to your .env.local —
// copy it from Razorpay Dashboard → Settings → Webhooks → Secret

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text(); // raw body needed for signature check
    const signature = req.headers.get("x-razorpay-signature") ?? "";

    // ── 1. Verify signature ─────────────────────────────────────
    const expectedSig = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSig !== signature) {
      console.warn("[webhook] Invalid Razorpay signature — request rejected");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ── 2. Parse event ──────────────────────────────────────────
    const event = JSON.parse(body);
    console.log("[webhook] Event received:", event.event);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const notes = payment.notes ?? {};

      // ── 3. Save to your database ─────────────────────────────
      // TODO: replace this block with your actual DB write
      // Example with Prisma:
      //
      // await prisma.preorder.create({
      //   data: {
      //     razorpayPaymentId: payment.id,
      //     razorpayOrderId:   payment.order_id,
      //     ownerName:         notes.owner_name,
      //     petName:           notes.pet_name,
      //     email:             notes.email,
      //     phone:             notes.phone,
      //     breed:             notes.breed,
      //     city:              notes.city,
      //     collarColour:      notes.collar_colour,
      //     source:            notes.source,
      //     rank:              parseInt(notes.rank),
      //     referralCode:      notes.referral_code || undefined,
      //     amountPaid:        payment.amount,   // in paise
      //     status:            "confirmed",
      //   },
      // });

      console.log("[webhook] Payment captured:", {
        paymentId: payment.id,
        orderId: payment.order_id,
        owner: notes.owner_name,
        pet: notes.pet_name,
        rank: notes.rank,
        amount: payment.amount,
      });

      // ── 4. Send confirmation email ────────────────────────────
      // TODO: plug in your email provider (Resend, Nodemailer, etc.)
      // Example with Resend:
      //
      // await resend.emails.send({
      //   from: "MyPerro <hello@myperro.in>",
      //   to:   notes.email,
      //   subject: `🐾 You're Founding Pack Member #${notes.rank}, ${notes.owner_name}!`,
      //   html: `<p>Welcome to the pack! Your spot #${notes.rank} is confirmed.</p>`,
      // });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[webhook] Error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
