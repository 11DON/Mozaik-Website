import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import jobRoutes from "./carreers/routes/job.routes.js";
import authRoutes from "./carreers/routes/auth.routes.js";
import applyRoutes from "./carreers/routes/apply.routes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',  // your frontend
  'http://localhost:5137',  // optional for testing
  'https://yourdomain.com', // production
];

app.use(cors());

app.use(bodyParser.json());

// Serve HR admin page - MUST come before API routes
app.use(express.static(path.join(__dirname, "public")));

// Mount API routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", applyRoutes);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Test transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP connection error:", error);
    } else {
        console.log("SMTP ready to send emails");
    }
});

app.post("/api/send-email", async (req, res) => {
    const { user_name, service, city, phone, project } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            replyTo: "noreply@example.com",
            to: process.env.EMAIL_TO,
            subject: "Service Request",
            html: `
                <h3>Service Request Received</h3>
                <p><strong>الاسم:</strong> ${user_name}</p>
                <p><strong>الخدمة المطلوبة:</strong> ${service}</p>
                <p><strong>المدينة:</strong> ${city}</p>
                <p><strong>رقم الجوال:</strong> ${phone}</p>
                <p><strong>وصف المشروع:</strong> ${project}</p>
            `,
        });
        
        res.json({ message: "Email sent successfully" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ message: "Email failed", error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log(`HR Admin panel: http://localhost:${process.env.PORT}/`);
});