const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getEventAttendance
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/roleCheck.middleware');

router.use(protect);
router.use(authorize('ngo_admin'));

router.route('/')
    .post(markAttendance);

router.route('/event/:eventId')
    .get(getEventAttendance);

module.exports = router;
