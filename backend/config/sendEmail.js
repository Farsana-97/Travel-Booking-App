import nodemailer from 'nodemailer'

export const sendEmail = async (to, subject, html, text) => {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
    
    const mailOptions = {
      from: `"${process.env.GMAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
}
