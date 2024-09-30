import { transporter } from "./nodemailer";
import { resend } from "./resend";
import { Email } from "@/components/email/email";
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "Reset your password",
    react: Email({ url: resetLink, titleEmail: "Reset Password" }),
    text: "", // Provide an empty string as a placeholder for the text version
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  // const test = await resend.emails.send({
  //   from: "Ixu <noreply@ixuapps.online>",
  //   to: email,
  //   subject: "Confirm your email",
  //   react: Email({ url: confirmLink, titleEmail: "Verification Account" }),
  //   text: "", // Provide an empty string as a placeholder for the text version
  // });

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Verification Account</h2>
      <p>To verify your email address, please click the link below:</p>
      <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 4px;">Confirm your email</a>
      <p>If you did not request this email, please ignore it.</p>
      <hr />
      <p style="font-size: 12px; color: #666;">This email was sent from Ixu</p>
    </div>
  `;

  const mailOptions = {
    from: "Ixu <noreply@ixuapps.online>",
    to: email,
    subject: "Confirm your email",
    text: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};
