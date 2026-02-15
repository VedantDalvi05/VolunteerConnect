const Event = require('../models/Event');
const { asyncHandler } = require('../utils/helpers');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    res.status(200).json(event);
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = asyncHandler(async (req, res) => {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Handle image upload if present
    if (req.file) {
        req.body.image = req.file.path;
    }

    const event = await Event.create(req.body);

    res.status(201).json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = asyncHandler(async (req, res) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Make sure user is event owner or admin
    // For now assuming all admins can edit all events

    if (req.file) {
        req.body.image = req.file.path;
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(event);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    await event.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};
