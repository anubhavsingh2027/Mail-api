import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MailerSend, { EmailParams, Sender, Recipient } from "mailersend";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow all origins
app.use(cors());

// ✅ Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Initialize MailerSend client
const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY, // Use your MailerSend API key
});

// ✅ Health check route
app.get("/", (req, res) =>
  res.send("🚀 Server is running and ready to send emails via MailerSend!")
);

// ✅ Email sending route
app.post("/sendMail", async (req, res) => {
  try {
    const { to, websiteName, subject, message } = req.body;

    if (!to || !websiteName || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        received: req.body,
      });
    }

    // ✅ Define sender & recipient
    const sentFrom = new Sender(`noreply@mailer.anubhav.sbs`, websiteName);
    const recipients = [new Recipient(to)];

    // ✅ Build email parameters
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(message);

    // ✅ Send the email
    const response = await mailersend.email.send(emailParams);

    return res.json({
      success: true,
      message: "✅ Email sent successfully via MailerSend!",
      response,
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
