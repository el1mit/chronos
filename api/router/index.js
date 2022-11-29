const express = require('express');
const authRouter = require('./AuthRouter');
const calendarRouter = require('./CalendarRouter');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/calendars', calendarRouter);

module.exports = router;