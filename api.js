import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ GET route
app.get('/', (req, res) => res.send('Server is running!'));

// ✅ POST route
app.post('/sendMail', async (req, res) => {
  try {

    const { mailTo, webSiteName, subject, message } = req.body;

    if (!mailTo || !webSiteName || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const response = await resend.emails.send({
      from: `${webSiteName} <support@anubhavmail.anubhavsingh.website>`,
      to: mailTo,
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
