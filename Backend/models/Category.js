const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    icon: {
        type: String // Optional icon class or url
    }
});

module.exports = mongoose.model('Category', categorySchema);
