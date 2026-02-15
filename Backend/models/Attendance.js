const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        default: 'present'
    },
    checkInTime: {
        type: Date,
        default: Date.now
    },
    checkOutTime: {
        type: Date
    },
    verifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User' // Admin who verified
    }
});

// One attendance record per user per event
attendanceSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
