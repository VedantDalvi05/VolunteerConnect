const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Attendance = require('../models/Attendance');
const { asyncHandler } = require('../utils/helpers');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/dashboard/admin
// @access  Private (Admin)
const getAdminStats = asyncHandler(async (req, res) => {
    const totalVolunteers = await User.countDocuments({ role: 'volunteer' });
    const totalEvents = await Event.countDocuments({});

    // Calculate total impact hours (mock logic or based on event duration * attendance)
    // For now, let's assume each event is 4 hours on average for attended events
    const attendedCount = await Registration.countDocuments({ status: 'attended' });
    const totalHours = attendedCount * 4;

    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
        totalVolunteers,
        totalEvents,
        totalHours,
        recentEvents
    });
});

// @desc    Get Volunteer Dashboard Stats
// @route   GET /api/dashboard/volunteer
// @access  Private (Volunteer)
const getVolunteerStats = asyncHandler(async (req, res) => {
    const myRegistrations = await Registration.find({ user: req.user.id });
    const eventsAttended = myRegistrations.filter(r => r.status === 'attended').length;
    const hoursContributed = eventsAttended * 4; // Mock logic

    res.status(200).json({
        eventsAttended,
        hoursContributed,
        impactScore: eventsAttended * 10 // Mock score
    });
});

module.exports = {
    getAdminStats,
    getVolunteerStats
};
