// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint to send email
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // or smtp config
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
