import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"TravelVista Booking System" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `📩 New Contact Message from ${name}`,
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <div style="background-color: #2563eb; color: white; padding: 15px 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 20px;">TravelVista Booking System</h2>
        <p style="margin: 0; font-size: 14px;">You’ve received a new message!</p>
      </div>

      <div style="padding: 20px;">
        <h3 style="color: #333;">Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px; color: #333;">${name}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px; color: #333;">${email}</td>
          </tr>
        </table>

        <div style="margin-top: 15px;">
          <h3 style="color: #333;">Message</h3>
          <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 12px; border-radius: 6px; color: #444;">
            ${message}
          </div>
        </div>
      </div>

      <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} TravelVista. All rights reserved.</p>
      </div>

    </div>
  </div>
`,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

export default contactRouter;
