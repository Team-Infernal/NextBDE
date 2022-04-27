import dbConnect from "../../../lib/dbConnect";
import processQueries from "../../../lib/processQueries";
import Event from "../../../models/Event";

export default async (req, res) => {
	const { method, query } = req;

	await dbConnect();

	switch (method) {
		case "GET":
			try {
				const rawEvents = await Event.find({});
				const events = processQueries(rawEvents, query);
				res.status(200).json({
					success: true,
					data: events,
				});
			} catch (error) {
				res.status(400).json({
					success: false,
				});
			}
			break;
		
		case "POST":
			try {
				const event = await Event.create(req.body);
				res.status(201).json({
					success: true,
					data: event,
				});
			} catch (error) {
				res.status(400).json({
					success: false,
				});
			}
			break;
		
		default:
			res.status(400).json({
				success: false,
			});
			break;
	}
}