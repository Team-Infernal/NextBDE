import processQueries from "../../../lib/processQueries";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
	const { method, query } = req;
	const client = await clientPromise;

	switch (method) {
		case "GET":
			try {
				const events = await client
					.db(process.env.MONGODB_DB)
					.collection("events")
					.find({})
					.toArray();
				const processedEvents = processQueries(events, query);

				res.status(200).json({
					success: true,
					data: processedEvents,
				});
			} catch (error) {
				res.status(400).json({
					success: false,
				});
			}
			break;

		case "POST":
			try {
				await client
					.db(process.env.MONGODB_DB)
					.collection("events")
					.insertOne(req.body);

				res.status(201).json({
					success: true,
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