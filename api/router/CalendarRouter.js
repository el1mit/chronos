const express = require("express");
const CalendarController = require("../controllers/CalendarController");
const EventController = require('../controllers/EventController');
const categoryMiddleware = require('../middlewares/CategoryMiddleware');
const authMiddleware = require('../middlewares/AuthMiddleware');
const {body} = require('express-validator');

const calendarRouter = express.Router();
const calendarController = new CalendarController();
const eventController = new EventController();


calendarRouter.post('/invite', authMiddleware, body('email').isEmail(), body('calendar_id').isLength({min: 24, max: 24}), calendarController.sendLinkToInvite)
calendarRouter.post("/", authMiddleware, categoryMiddleware, body('name').isLength({min: 1, max: 20}), body('description').isLength({max: 100}), calendarController.create);
calendarRouter.post('/:id/events', authMiddleware, body('name').isLength({min: 1, max: 20}), eventController.createEvent);

calendarRouter.get('/go-into/:token', calendarController.goIntoCalendar);
calendarRouter.get("/:calendar_id/events", authMiddleware, eventController.getEventsByCalendarId);
calendarRouter.get("/:calendar_id/events/:event_id", authMiddleware, eventController.getEventById);
calendarRouter.get("/:id", authMiddleware, calendarController.getCalendarById);

calendarRouter.patch("/:id", authMiddleware, calendarController.updateCalendarById);
calendarRouter.patch("/:calendar_id/user/:user_id", authMiddleware, calendarController.updateUserInCalendar);
calendarRouter.patch("/:calendar_id/events/:event_id", authMiddleware, body('name').isLength({max: 20}), eventController.updateEvent);

calendarRouter.delete("/:calendar_id/user/:user_id", authMiddleware, calendarController.removeUserFromCalendar);
calendarRouter.delete("/:calendar_id/events/:event_id", authMiddleware, eventController.deleteEvent);
calendarRouter.delete("/:id", authMiddleware, calendarController.deleteCalendarById);


module.exports = calendarRouter;