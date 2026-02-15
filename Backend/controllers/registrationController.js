const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { asyncHandler } = require('../utils/helpers');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
const registerForEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Check capacity
    if (event.registeredCount >= event.capacity) {
        res.status(400);
        throw new Error('Event is full');
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
        user: req.user.id,
        event: eventId
    });

    if (existingRegistration) {
        res.status(400);
        throw new Error('already registered for this event');
    }

    const registration = await Registration.create({
        user: req.user.id,
        event: eventId
    });

    // Update event count
    event.registeredCount += 1;
    await event.save();

    res.status(201).json(registration);
});

// @desc    Get user registrations
// @route   GET /api/registrations/my
// @access  Private
const getMyRegistrations = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({ user: req.user.id })
        .populate('event')
        .sort({ registeredAt: -1 });

    res.status(200).json(registrations);
});

// @desc    Cancel registration
// @route   PUT /api/registrations/:id/cancel
// @access  Private
const cancelRegistration = asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
        res.status(404);
        throw new Error('Registration not found');
    }

    // Ensure user owns registration
    if (registration.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    if (registration.status === 'cancelled') {
        res.status(400);
        throw new Error('Registration already cancelled');
    }

    registration.status = 'cancelled';
    await registration.save();

    // Decrease event count
    const event = await Event.findById(registration.event);
    if (event) {
        event.registeredCount = Math.max(0, event.registeredCount - 1);
        await event.save();
    }

    res.status(200).json(registration);
});

module.exports = {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
};
