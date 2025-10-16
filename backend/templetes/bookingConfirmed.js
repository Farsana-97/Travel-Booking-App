export const bookingConfirmed = (username, packageName, bookingId, totalAmount,totalPersons,travelDate) => {
  return {
    subject: `🎉 Your Booking is Confirmed — ${packageName}`,
    text: `Hi ${username}, your booking #${bookingId} for ${packageName} is confirmed. Total paid: $${totalAmount}. Thank you for choosing our travel service!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4CAF50; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Booking Confirmed 🎉</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${username}</strong>,</p>
          <p>We are excited to let you know that your booking for ${packageName} has been <strong>successfully confirmed</strong>!</p>
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
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Paid</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">$${totalAmount}</td>
            </tr>
             <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Persons</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${totalPersons}</td>
            </tr>
             <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Date</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${travelDate}</td>
            </tr>
          </table>
          <p>Thank you for choosing our travel service. We wish you a wonderful journey! ✈️</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="/my-bookings" style="background-color: #4CAF50; color: #fff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">View My Booking</a>
          </div>
          <p style="font-size: 12px; color: #777;">If you have any questions, feel free to contact our support team.</p>
        </div>
        <div style="background-color: #f4f4f4; color: #555; padding: 15px; text-align: center; font-size: 12px;">
          &copy; 2025 Travel Booking System. All rights reserved.
        </div>
      </div>
    `,
  };
};
