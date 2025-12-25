import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail handles host/port automatically
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Google App Password
    },
});

// Test connection immediately
transporter.verify((err, success) => {
    if (err) console.error("SMTP connection failed:", err);
    else console.log("SMTP ready to send emails");
});

export default transporter;
