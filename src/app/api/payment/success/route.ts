import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import mongoose from "mongoose";
import Submission from "@/models/Submission";

export const runtime = "nodejs";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { submissionId, razorpay_payment_id } = await req.json();

    if (!submissionId || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔎 Fetch payment directly from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      return NextResponse.json(
        { error: "Payment not captured" },
        { status: 400 }
      );
    }

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (submission.paymentStatus === "captured") {
      return NextResponse.json({ message: "Already processed" });
    }

    // 📊 Count total paid users
    const totalPaid = await Submission.countDocuments({
      paymentStatus: "captured",
    });

    const cohortNumber = Math.floor(totalPaid / 20) + 1;
    const cohortPosition = (totalPaid % 20) + 1;

    const referralCode =
      "REF" + razorpay_payment_id.slice(-8).toUpperCase();

    submission.paymentStatus = "captured";
    submission.razorpayPaymentId = razorpay_payment_id;
    submission.cohortNumber = cohortNumber;
    submission.cohortPosition = cohortPosition;
    submission.referralCode = referralCode;

    await submission.save();

    return NextResponse.json({
      message: "Payment verified successfully",
      data: {
        cohortNumber,
        cohortPosition,
        referralCode,
      },
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
