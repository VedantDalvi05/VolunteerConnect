const transporter = require('../config/email.config');

const sendEmail = async (options) => {
    const message = {
        from: `${process.env.FROM_NAME || 'VolunteerConnect'} <${process.env.FROM_EMAIL || 'noreply@volunteerconnect.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
