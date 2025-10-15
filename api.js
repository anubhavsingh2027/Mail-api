import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for all origins
app.use(cors({
  origin: ["https://kashika-travel.anubhavsingh.website","https://portfolio.anubhavsingh.website"],
}));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/', (req, res) => res.send('Server is running!'));

app.post('/sendMail', async (req, res) => {
  try {
    const { to, websiteName, subject, message } = req.body;
    if (!to || !websiteName || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields',message:req.body });
    }
    const response = await resend.emails.send({
      from: `${websiteName} <support@anubhavmail.anubhavsingh.website>`,
      to: to,
      subject,
      html: message,
    });
    return res.json({ success: !!response.data.id });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
