const nodemailer = require('nodemailer');

// Initialize the transporter
// You should add these variables to your .env file
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

module.exports = transporter;
