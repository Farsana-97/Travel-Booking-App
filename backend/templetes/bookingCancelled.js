export const bookingCancelled = (username,bookingId, packageName, totalAmount) => {
  return {
    subject: `❌ Booking Cancelled & Refunded — ${packageName}`,
    text: `Hi ${username}, your booking #${bookingId} for ${packageName} has been cancelled. A refund of $${totalAmount} has been issued to your original payment method.`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
      <div style="background: linear-gradient(135deg, #7c3aed, #9333ea); color: white; padding: 25px 20px;">
        <h2 style="margin: 0;">Booking Cancelled & Refunded</h2>
      </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${username}</strong>,</p>
          <p>We’re are informing you that your booking for <strong>${packageName}</strong> has been <strong>cancelled</strong>.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Booking ID</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">#${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Package</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${packageName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Refund Amount</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">$${totalAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd; color: #16a34a;"><strong>Refunded Successfully</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleDateString()}</td>
            </tr>
          </table>

          <p style="line-height: 1.6;">The refund has been processed to your original payment method. 
          It may take 3–5 business days for the amount to reflect in your account.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="/packages" style="background-color: #3b82f6; color: #fff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">Browse Other Packages</a>
          </div>

          <p style="font-size: 14px; color: #777;">
            We hope to serve you again soon. If you have any questions, please reach out to our support team.
          </p>
        </div>
        <div style="background-color: #f4f4f4; color: #555; padding: 15px; text-align: center; font-size: 12px;">
          &copy; 2025 Travel Booking System. All rights reserved.
        </div>
      </div>
    `,
  };
};
