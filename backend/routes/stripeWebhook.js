import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { bookingConfirmed } from "../templetes/bookingConfirmed.js";
import { sendEmail } from "../config/sendEmail.js";


dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe webhook endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        const payment = await Payment.findOne({ transactionId: session.id });
        if (payment) {
          payment.status = "completed";
          await payment.save();

          const booking = await Booking.findById(payment.booking).populate(
            "package"
          );
          const user = await User.findById(payment.user);
          const pkg = booking.package;

          const { subject, html, text } = bookingConfirmed(
            user.username,
            pkg.title,
            booking._id,
            booking.totalAmount
          );

          await sendEmail(user.email, subject, html, text);
          console.log(`Email sent to ${user.email}`);
        }
      } catch (err) {
        console.error("Error processing webhook:", err);
      }
    }

  }
);

export default router;
