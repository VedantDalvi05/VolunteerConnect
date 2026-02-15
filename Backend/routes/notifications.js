const express = require('express');
const router = express.Router();
const {
    getMyNotifications,
    markAsRead
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
    .get(getMyNotifications);

router.route('/:id/read')
    .put(markAsRead);

module.exports = router;
