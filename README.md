# 📬 Mail API Service (Resend + Express)

This is a lightweight and fast **Mail Sending API** built using **Node.js**, **Express**, and **Resend**.
It allows you to send transactional or notification emails from any application — frontend or backend.

✅ Works with **React, Vue, Angular, Mobile Apps, Node, Python, PHP, etc.**
✅ Perfect for sending OTPs, account verification, booking confirmations, and contact form messages.

---

## 🚀 Live Status

Server running and ready to send emails! ✔

yaml
Copy code

You can test the API using **Postman**, **Thunder Client**, or directly from your frontend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | API server framework |
| Resend API | Email sending service |
| CORS | Allows cross-origin requests |
| dotenv | Secure environment variable handling |

---

## ⚙️ Environment Setup

Create a `.env` file and add:

```env
RESEND_API_KEY=your_resend_api_key_here
PORT=3000
Get your API Key here → https://resend.com

📦 Installation & Run
bash
Copy code
# Clone
git clone <repo-url>

# Install dependencies
npm install

# Start server
npm start
The API will run at:

arduino
Copy code
http://localhost:3000
🔥 API Endpoints
Health Check
sql
Copy code
GET /
Response:

arduino
Copy code
🚀 Server is running and ready to send emails!
Send Email
bash
Copy code
POST /sendMail