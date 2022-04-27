import { data } from "../../../data";

export default (req, res) => {
	const { query: { id } } = req;

	const event = data.find(user => user.id === parseInt(id));

	if (!event) {
		return res.status(404).json({
			status: 404,
			message: "Not found",
		});
	}

	return res.status(200).json({ ...event });
}