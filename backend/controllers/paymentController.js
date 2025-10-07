import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

dotenv.config();

// Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment checkout session

export const paymentSession = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate("package");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: booking.package.title,
            },
            unit_amount: booking.totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success/${bookingId}`,
      cancel_url: `http://localhost:5173/payment-cancel/${bookingId}`,
    });

    const payment = await Payment.create({
      booking: bookingId,
      user: userId,
      amount: booking.totalAmount,
      transactionId: session.id,
    });

    res.status(200).json({ id: session.id, url: session.url, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
     .populate("user", "username");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updatePaymentStatus = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    if (!sessionId || !status) {
      return res.status(400).json({ error: "Missing sessionId or status" });
    }

    const payment = await Payment.findOneAndUpdate(
      { transactionId: sessionId },
      { status },
      { new: true }
    );

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};