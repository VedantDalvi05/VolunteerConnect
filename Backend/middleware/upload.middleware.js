const { parser } = require('../config/cloudinary.config');

const upload = parser; // Re-exporting the multer parser configured with Cloudinary

module.exports = upload;
