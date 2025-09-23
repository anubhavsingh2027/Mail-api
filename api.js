// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Generic HTML wrapper (no hardcoded message)
const wrapHtmlTemplate = (subject, message) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <div style="background:#6d28d9; color:white; padding:16px; text-align:center;">
      <h2 style="margin:0;">${subject}</h2>
    </div>
    <div style="padding:20px;">
      ${message}
    </div>
    <div style="background:#f9f9f9; padding:12px; text-align:center; font-size:12px; color:#666;">
      Sent via <strong>Your Portfolio Website</strong>
    </div>
  </div>
`;

// API endpoint
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.json({ success: false, error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Mailer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message.replace(/<[^>]+>/g, ""), // plain text fallback
      html: wrapHtmlTemplate(subject, message),
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

app.listen(5000, () =>
  console.log("✅ API running on http://localhost:5000")
);
