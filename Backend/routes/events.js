const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/roleCheck.middleware');
const upload = require('../middleware/upload.middleware');

router.route('/')
    .get(getEvents)
    .post(protect, authorize('ngo_admin'), upload.single('image'), createEvent);

router.route('/:id')
    .get(getEvent)
    .put(protect, authorize('ngo_admin'), upload.single('image'), updateEvent)
    .delete(protect, authorize('ngo_admin'), deleteEvent);

module.exports = router;
