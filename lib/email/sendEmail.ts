import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: 'sanjana.mahmood10@gmail.com',
    pass: 'grintnnbwlkhifpn',
  }
});

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const info = await transporter.sendMail({
      from: 'sanjana.mahmood10@gmail.com',
      to: email,
      subject: 'Authentication OTP',
      text: `Your OTP is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Your Authentication Code</h2>
          <p>Here's your one-time password (OTP) for Eveagle Academy:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4f46e5; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 5 minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

interface CourseEnrollmentEmailParams {
  email: string;
  courseName: string;
  studentName: string;
  paymentMethod: 'credit' | 'fps';
  amount: number;
  currency: string;
}

export const sendCourseEnrollmentEmail = async ({
  email,
  courseName,
  studentName,
  paymentMethod,
  amount,
  currency
}: CourseEnrollmentEmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: 'sanjana.mahmood10@gmail.com',
      to: email,
      subject: `Course Enrollment Confirmation - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Course Enrollment Confirmation</h2>
          <p>Dear ${studentName},</p>
          
          <p>Thank you for enrolling in <strong>${courseName}</strong>! ${
            paymentMethod === 'fps' 
              ? 'Your payment is being processed and your enrollment will be activated once the payment is verified.'
              : 'Your payment has been successfully processed and your enrollment is now active.'
          }</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin: 0 0 15px 0;">Enrollment Details</h3>
            <div style="color: #374151;">
              <p style="margin: 5px 0;"><strong>Course:</strong> ${courseName}</p>
              <p style="margin: 5px 0;"><strong>Student:</strong> ${studentName}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${
                paymentMethod === 'fps' ? 'FPS Transfer' : 'Credit Card'
              }</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> ${
                paymentMethod === 'fps' ? 'Pending Verification' : 'Active'
              }</p>
            </div>
          </div>

          ${paymentMethod === 'fps' ? `
            <div style="background-color: #fdf6b2; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin: 0 0 10px 0;">Next Steps</h3>
              <p style="color: #92400e; margin: 0;">Please send your payment proof via WhatsApp to complete the enrollment process. Your course access will be activated once the payment is verified.</p>
            </div>
          ` : `
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #166534; margin: 0 0 10px 0;">Get Started</h3>
              <p style="color: #166534; margin: 0;">You can now access your course through your dashboard. Start your learning journey today!</p>
            </div>
          `}

          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            If you have any questions or need assistance, please don't hesitate to contact us.
          </p>
        </div>
      `
    });
    console.log('Course enrollment email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending course enrollment email:', error);
    throw error;
  }
}; 