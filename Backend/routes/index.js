const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const eventRoutes = require('./events');
const registrationRoutes = require('./registrations');
const attendanceRoutes = require('./attendance');
const notificationRoutes = require('./notifications');
const userRoutes = require('./users');
const dashboardRoutes = require('./dashboard');

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/registrations', registrationRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
