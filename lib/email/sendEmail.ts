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
      subject: 'Verify Your Email - Eveagle Academy',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; background: linear-gradient(to right, #A78BFA, #DB2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Eveagle Academy</h1>
            <p style="color: #6b7280; margin-top: 5px;">Empowering Young Minds Through Technology</p>
          </div>

          <div style="background-color: #4f46e5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h2 style="color: white; margin: 0;">Welcome to Eveagle Academy!</h2>
          </div>

          <div style="background-color: #f3f4f6; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #374151; font-size: 16px; margin: 0 0 20px 0;">Here's your verification code:</p>
            <div style="background: linear-gradient(to right, #8B5CF6, #EC4899); padding: 2px; border-radius: 8px; margin: 0 auto; max-width: 200px;">
              <div style="background-color: #1f2937; padding: 15px; border-radius: 6px;">
                <h1 style="color: white; letter-spacing: 5px; margin: 0; font-size: 32px; font-family: monospace;">${otp}</h1>
              </div>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">This code will expire in 5 minutes</p>
          </div>

          <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 16px;">Security Tips:</h3>
            <ul style="color: #9ca3af; margin: 0; padding-left: 20px; font-size: 14px;">
              <li style="margin-bottom: 5px;">Never share this code with anyone</li>
              <li style="margin-bottom: 5px;">Eveagle Academy will never ask for your code via email or phone</li>
              <li style="margin-bottom: 5px;">Make sure you're on the official Eveagle Academy website</li>
            </ul>
          </div>

          <div style="margin: 30px 0; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Didn't request this code?</p>
            <p style="color: #4b5563; font-size: 14px; margin: 0;">If you didn't request this verification code, please ignore this email or contact our support team if you have concerns about your account security.</p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <div style="margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at</p>
              <a href="mailto:eveagleacademy@gmail.com" style="color: #8B5CF6; text-decoration: none; font-size: 14px;">eveagleacademy@gmail.com</a>
            </div>
            <div style="margin-bottom: 20px;">
              <a href="https://wa.me/85269661709" style="color: #8B5CF6; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center;">
                <span>Contact on WhatsApp</span>
              </a>
            </div>
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Eveagle Academy. All rights reserved.
            </p>
          </div>
        </div>
      `
    });
    console.log('OTP email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
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