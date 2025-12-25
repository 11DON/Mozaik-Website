import dotenv from "dotenv";
dotenv.config();

import transporter from "../backend/carreers/config/mail.js"; // adjust path if needed

async function sendTestEmail() {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "Test Email from Node",
            text: "Hello! This is a test email from your Node backend.",
        });
        console.log("Email sent successfully:", info.response);
    } catch (err) {
        console.error("Email failed:", err);
    }
}

sendTestEmail();
