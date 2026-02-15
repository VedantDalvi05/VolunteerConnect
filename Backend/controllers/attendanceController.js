const Attendance = require('../models/Attendance');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { asyncHandler } = require('../utils/helpers');

// @desc    Mark attendance (Admin manual or QR scan)
// @route   POST /api/attendance
// @access  Private (Admin)
const markAttendance = asyncHandler(async (req, res) => {
    const { eventId, userId, status } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Verify registration exists
    const registration = await Registration.findOne({
        event: eventId,
        user: userId
    });

    if (!registration) {
        res.status(400);
        throw new Error('User is not registered for this event');
    }

    // Check if attendance already marked
    let attendance = await Attendance.findOne({
        event: eventId,
        user: userId
    });

    if (attendance) {
        // Update existing
        attendance.status = status || 'present';
        attendance.verifiedBy = req.user.id;
        attendance.checkInTime = Date.now();
        await attendance.save();
    } else {
        // Create new
        attendance = await Attendance.create({
            event: eventId,
            user: userId,
            status: status || 'present',
            verifiedBy: req.user.id
        });
    }

    // Update registration status
    registration.status = status === 'absent' ? 'absent' : 'attended';
    await registration.save();

    res.status(200).json(attendance);
});

// @desc    Get event attendance list
// @route   GET /api/attendance/event/:eventId
// @access  Private (Admin)
const getEventAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.find({ event: req.params.eventId })
        .populate('user', 'name email phone')
        .populate('verifiedBy', 'name');

    res.status(200).json(attendance);
});

module.exports = {
    markAttendance,
    getEventAttendance
};
