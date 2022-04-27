import { useEffect, useState } from "react";

export default () => {

	const [events, setEvents] = useState([]);

	useEffect(() => {

		const fetchEvents = async () => {
			const response = await fetch("/api/events", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			
			if (!response.ok) {
				console.log("Couldn't fetch events");
			}

			const data = await response.json();
			setEvents(data);
		}

		fetchEvents();

	}, []);

	return (
		<div>
			<h1>Evenements</h1>
			<div>
			</div>
		</div>
	)
}