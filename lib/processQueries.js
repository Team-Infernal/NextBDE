import { isAfterNow, getDateDiff } from "./processDates";

export default (events, query = {}) => {
	const queryLimits = {
		nb: {
			default: 10,
			min: 1,
			max: 20,
		},
		order: {
			default: "ascending",
			values: [
				"upcoming",
				"ascending",
				"descending",
			]
		},
	}

	let nb = queryLimits.nb.default;
	let order = queryLimits.order.default;

	if (query.hasOwnProperty("nb")) {
		if (query.nb < queryLimits.nb.min) nb = queryLimits.nb.min;
		else if (query.nb > queryLimits.nb.max) nb = queryLimits.nb.max;
		else nb = query.nb;
	}

	if (query.hasOwnProperty("order")) {
		if (queryLimits.order.values.includes(query.order)) order = query.order;
	}

	if (order === "upcoming") {
		const filteredEvents = events
			.filter(event => isAfterNow(event.date.start))
			.sort((eventA, eventB) => getDateDiff(eventA.date.start, eventB.date.start))
			.slice(0, nb);
		
		return filteredEvents;
	}

	return events;
}