import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/api/send-email", async (req, res) => {
    const { user_name, service, city, phone, project } = req.body;
    console.log(req.body);

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

        res.json({ message: "Email sent (test ok)" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Email failed" });
    }
});

app.listen(process.env.PORT, () =>
    console.log(`Test server running on ${process.env.PORT}`)
);
