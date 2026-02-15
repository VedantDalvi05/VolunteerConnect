const express = require('express');
const router = express.Router();
const {
    getAdminStats,
    getVolunteerStats
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/roleCheck.middleware');

router.use(protect);

router.get('/admin', authorize('ngo_admin'), getAdminStats);
router.get('/volunteer', authorize('volunteer'), getVolunteerStats);

module.exports = router;
