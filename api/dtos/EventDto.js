module.exports = class EventDto {
	constructor(model) {
		this.id = model._id;
		this.creater_id = model.owner_id;
		this.calendar_id = model.calendar_id;
		this.name = model.name;
		this.start_time = model.start_time;
		this.end_time = model.end_time;
	}
};
