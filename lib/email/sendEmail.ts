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
      from: '"Eveagle Academy" <sanjana.mahmood10@gmail.com>',
      to: email,
      subject: 'Authentication OTP',
      text: `Your OTP is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; background: linear-gradient(to right, #A78BFA, #DB2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eveagle Academy</h1>
            <p style="color: #6b7280; margin-top: 5px;">Empowering Young Minds Through Technology</p>
          </div>

          <h2 style="color: #6366f1;">Your Authentication Code</h2>
          <p>Here's your one-time password (OTP) for Eveagle Academy:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4f46e5; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 5 minutes.</p>
          <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Eveagle Academy. All rights reserved.
            </p>
          </div>
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

interface EnrollmentEmailParams {
  email: string;
  courseName: string;
  studentName: string;
  amount: number;
  currency: string;
}

// For credit card payments and verified FPS payments
export const sendEnrollmentConfirmationEmail = async ({
  email,
  courseName,
  studentName,
  amount,
  currency
}: EnrollmentEmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: '"Eveagle Academy" <sanjana.mahmood10@gmail.com>',
      to: email,
      subject: `Course Enrollment Confirmation - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; background: linear-gradient(to right, #A78BFA, #DB2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eveagle Academy</h1>
            <p style="color: #6b7280; margin-top: 5px;">Empowering Young Minds Through Technology</p>
          </div>

          <h2 style="color: #6366f1;">Course Enrollment Confirmation</h2>
          <p>Dear ${studentName},</p>
          
          <p>Great news! Your enrollment in <strong>${courseName}</strong> has been confirmed. Your payment has been successfully processed and your enrollment is now active.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin: 0 0 15px 0;">Enrollment Details</h3>
            <div style="color: #374151;">
              <p style="margin: 5px 0;"><strong>Course:</strong> ${courseName}</p>
              <p style="margin: 5px 0;"><strong>Student:</strong> ${studentName}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> Active</p>
            </div>
          </div>

          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">Get Started</h3>
            <p style="color: #166534; margin: 0;">You can now access your course through your dashboard. Start your learning journey today!</p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            If you have any questions or need assistance, please don't hesitate to contact us.
          </p>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Eveagle Academy. All rights reserved.
            </p>
          </div>
        </div>
      `
    });
    console.log('Enrollment confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending enrollment confirmation email:', error);
    throw error;
  }
};

// For pending FPS payments
export const sendFPSPendingEmail = async ({
  email,
  courseName,
  studentName,
  amount,
  currency
}: EnrollmentEmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: '"Eveagle Academy" <sanjana.mahmood10@gmail.com>',
      to: email,
      subject: `Course Enrollment Pending - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; background: linear-gradient(to right, #A78BFA, #DB2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eveagle Academy</h1>
            <p style="color: #6b7280; margin-top: 5px;">Empowering Young Minds Through Technology</p>
          </div>

          <h2 style="color: #6366f1;">Course Enrollment Pending Verification</h2>
          <p>Dear ${studentName},</p>
          
          <p>Thank you for enrolling in <strong>${courseName}</strong>! Your FPS payment is being processed and your enrollment will be activated once the payment is verified.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin: 0 0 15px 0;">Enrollment Details</h3>
            <div style="color: #374151;">
              <p style="margin: 5px 0;"><strong>Course:</strong> ${courseName}</p>
              <p style="margin: 5px 0;"><strong>Student:</strong> ${studentName}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> FPS Transfer</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> Pending Verification</p>
            </div>
          </div>

          <div style="background-color: #fdf6b2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">Please send your payment proof via WhatsApp to complete the enrollment process. Your course access will be activated once the payment is verified.</p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            If you have any questions or need assistance, please don't hesitate to contact us.
          </p>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Eveagle Academy. All rights reserved.
            </p>
          </div>
        </div>
      `
    });
    console.log('FPS pending email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending FPS pending email:', error);
    throw error;
  }
};

interface AdminNotificationParams {
  courseName: string;
  studentName: string;
  amount: number;
  currency: string;
  paymentId: string;
}

export const sendAdminEnrollmentNotification = async ({
  courseName,
  studentName,
  amount,
  currency,
  paymentId
}: AdminNotificationParams) => {
  try {
    const info = await transporter.sendMail({
      from: '"Eveagle Academy System" <sanjana.mahmood10@gmail.com>',
      to: 'sanjana.mahmood10@gmail.com', // Admin email
      subject: `New Course Enrollment Request - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; background: linear-gradient(to right, #A78BFA, #DB2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eveagle Academy</h1>
            <p style="color: #6b7280; margin-top: 5px;">Admin Notification</p>
          </div>

          <div style="background-color: #4f46e5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: white; margin: 0;">New Enrollment Request</h2>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin: 0 0 15px 0;">Request Details</h3>
            <div style="color: #374151;">
              <p style="margin: 5px 0;"><strong>Course:</strong> ${courseName}</p>
              <p style="margin: 5px 0;"><strong>Student:</strong> ${studentName}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> FPS Transfer</p>
              <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${paymentId}</p>
            </div>
          </div>

          <div style="background-color: #fdf6b2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">Action Required</h3>
            <p style="color: #92400e; margin: 0;">Please verify the FPS payment proof when received via WhatsApp and approve the enrollment through the admin dashboard.</p>
          </div>

          <a href="http://localhost:3000/admin/dashboard" style="display: inline-block; background: linear-gradient(to right, #8B5CF6, #EC4899); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin-top: 20px;">
            Go to Admin Dashboard
          </a>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Eveagle Academy. All rights reserved.
            </p>
          </div>
        </div>
      `
    });
    console.log('Admin notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw error;
  }
}; 