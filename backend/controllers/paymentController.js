import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { sendEmail } from "../config/sendEmail.js";
import { bookingConfirmed } from "../templetes/bookingConfirmed.js";

dotenv.config();

// Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment checkout session with notification

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
      success_url: `${process.env.FRONTEND_URL}/payment-success/${bookingId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel/${bookingId}`,
    });

    const payment = await Payment.create({
      booking: bookingId,
      user: userId,
      amount: booking.totalAmount,
      transactionId: session.id,

    });

    res.status(200).json({ id: session.id, url: session.url, payment });

    const user = await User.findById(userId);
    const pkg = booking.package;

    const { subject, html, text } = bookingConfirmed(
      user.username,
      pkg.title,
      bookingId,
      booking.totalAmount,
      booking.totalPersons,
      booking.travelDate
    )
    
    const mail = await sendEmail(user.email, subject, html, text);
    console.log(mail)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
     .populate("user", "username");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

