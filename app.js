const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    },
});

async function sendMail() {
    const info = await transporter.sendMail({
        from: {
            name: 'TEST Name',
            address: process.env.USER
        },
        to: "shoxs24@gmail.com, marcfrancis.silva@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
}

app.get('/sendmail', (req, res) => {
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Send the email
    sendMail()
        .then(() => res.send('Email sent successfully'))
        .catch(err => {
            console.error('Error sending email:', err);
            res.status(500).send('Internal Server Error');
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
