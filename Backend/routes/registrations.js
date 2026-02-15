const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration
} = require('../controllers/registrationController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
    .post(registerForEvent);

router.route('/my')
    .get(getMyRegistrations);

router.route('/:id/cancel')
    .put(cancelRegistration);

module.exports = router;
