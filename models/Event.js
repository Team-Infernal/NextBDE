import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		start: {
			type: String,
			required: true
		},
		end: {
			type: String,
			required: true
		}
	},
	description: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	}
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);