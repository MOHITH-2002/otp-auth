import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);



export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  

  await resend.emails.send({
    from: "onboarding@qrtickets.software",
    to: email,
    subject: "Confirm your email",
    html: `<div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h1 style="color: #4CAF50;">Your Verification Code</h1>
        <p>Thank you for logging in. Please use the verification code below to complete your login:</p>
        <h2 style="font-size: 24px; font-weight: bold; color: #000;">${token}</h2>
        <p>This code is valid for only 5 minutes. If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Team IS</p>
      </div>`
  });
};
