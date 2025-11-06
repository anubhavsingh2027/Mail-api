import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow all origins (anyone can access)
app.use(cors());

// ✅ Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Health check route
app.get('/', (req, res) => res.send('🚀 Server is running and ready to send emails!'));

// ✅ Email sending route
app.post('/sendMail', async (req, res) => {
  try {
    const { to, websiteName, subject, message } = req.body;

    if (!to || !websiteName || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        received: req.body,
      });
    }

    const response = await resend.emails.send({
      from: `${websiteName} <noreply@anubhav-mail.nav-code.com>`, // ✅ fixed template string
      to,
      subject,
      html: message,
    });

    return res.json({
      success: true,
      id: response?.data?.id || null,
      message: 'Email sent successfully!',
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

