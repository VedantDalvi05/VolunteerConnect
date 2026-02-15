const QRCode = require('qrcode');

const generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error('QR Code generation failed', err);
        return null;
    }
};

module.exports = generateQRCode;
