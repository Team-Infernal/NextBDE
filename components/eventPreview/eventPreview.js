import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPenToSquare, faSpinner, faCalendarDays, faLocationDot, faCircleQuestion, faTriangleExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";

import { getDate, getDateTime, getTime, getNow } from "../../lib/processDates";
import utilStyles from "../../styles/utils.module.scss";
import styles from "./eventPreview.module.scss";

export default () => {

	const [selectedEventIndex, setSelectedEventIndex] = useState(-1);
	const [events, setEvents] = useState([]);

	/*
	Selected Event Indices:
		>=0: Events with index
		 -1: Loading
		 -2: Add event
		 -3: Remove event
		 -4: Edit event
		 -8: Add event successful
		 -9: Add event failed
		-10: Failed to load events
	*/

	const fetchEvents = async () => {
		const response = await fetch("/api/events?nb=3&order=upcoming", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const { success, data = [] } = await response.json();
		if (success) {
			setEvents(data);
			setSelectedEventIndex(0);
		} else {
			setSelectedEventIndex(-10);
		}
	}

	useEffect(() => {
		fetchEvents();
	}, []);

	const handleSelectAdd = () => setSelectedEventIndex(-2);
	const handleSelectRemove = () => setSelectedEventIndex(-3);
	const handleSelectEdit = () => setSelectedEventIndex(-4);

	const handleEventClick = eventIndex => setSelectedEventIndex(eventIndex);

	const handleEventAdd = async event => {
		event.preventDefault();
		setSelectedEventIndex(-1);

		const response = await fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: event.target.eventName.value,
				date: {
					start: event.target.eventDateTimeStart.value,
					end: event.target.eventDateTimeEnd.value,
				},
				description: event.target.eventDescription.value,
				location: event.target.eventLocation.value,
				created: getNow(),
			}),
		});

		const { success } = await response.json();

		if (success) setSelectedEventIndex(-8);
		else setSelectedEventIndex(-9);

		setTimeout(() => {
			fetchEvents();
		}, 2000)
	}



	return (
		<section className={styles.eventPreview}>
			<h2 className={styles.title}>Événements à venir</h2>
			<div className={styles.container}>
				<div className={styles.dates}>

					{events.map((event, index) => (
						<div
							key={`event${event._id}`}
							className={`${styles.date} ${index === selectedEventIndex ? styles.active : ""} ${index + 1 === selectedEventIndex ? styles.roundBottom : ""} ${index - 1 === selectedEventIndex ? styles.roundTop : ""}`}
							onClick={() => handleEventClick(index)}
						>
							<h3>{event.name}</h3>
							<h3>
								<span className={styles.day}>{getDate(event.date.start)}</span>
								<span className={styles.time}>{getTime(event.date.start)}</span>
							</h3>
						</div>
					))}

					<Link href="/evenements">
						<a className={`${styles.date} ${styles.more} ${selectedEventIndex === events.length - 1 ? styles.roundTop : ""}`}>
							<h3>Voir plus d'événements...</h3>
						</a>
					</Link>
					<div className={styles.datesControls}>
						<FontAwesomeIcon
							icon={faPlus}
							className={`fa-fw ${styles.controlIcon} ${utilStyles.accent}`}
							onClick={() => handleSelectAdd()}
						/>
						<FontAwesomeIcon
							icon={faMinus}
							className={`fa-fw ${styles.controlIcon} ${utilStyles.accent}`}
							onClick={() => handleSelectRemove()}
						/>
						<FontAwesomeIcon
							icon={faPenToSquare}
							className={`fa-fw ${styles.controlIcon} ${utilStyles.accent}`}
							onClick={() => handleSelectEdit()}
						/>
					</div>
					<div className={`${styles.date} ${styles.filler}`} />
				</div>

				<div className={styles.details}>
					{
						selectedEventIndex === -10
						?
						<>
							<h2 className={styles.detailsTitle}>
								<FontAwesomeIcon
									icon={faTriangleExclamation}
									className={`fa-fw ${utilStyles.accentDark}`}
								/>
								{" "}
								Impossible de charger les événements. Veuillez réessayer plus tard.
							</h2>
						</>
						: selectedEventIndex === -9
						?
						<>
							<h2 className={styles.detailsTitle}>
								<FontAwesomeIcon
									icon={faTriangleExclamation}
									className={`fa-fw ${utilStyles.accentDark}`}
								/>
								{" "}
								Erreur lors de l'ajout de l'événement.
							</h2>
						</>
						: selectedEventIndex === -8
						?
						<>
							<h2 className={styles.detailsTitle}>
								<FontAwesomeIcon
									icon={faCheck}
									className={`fa-fw ${utilStyles.accentDark}`}
								/>
								{" "}
								Événement ajouté!
							</h2>
						</>
						: selectedEventIndex === -1
						?
						<>
							<h2 className={styles.detailsTitle}>
								<FontAwesomeIcon
									icon={faSpinner}
									className={`fa-spin-pulse fa-fw ${utilStyles.accentDark}`}
								/>
								{" "}
								Chargement...
							</h2>
						</>
						: selectedEventIndex === -2
						?
						<>
							<h2 className={styles.detailsTitle}>Ajouter un événement</h2>
							<div className={styles.detailsAdd}>
								<form onSubmit={handleEventAdd} className={styles.form}>

									<label htmlFor="eventName">Nom</label>
									<input id="eventName" className={utilStyles.userInput} type="text" placeholder="Soirée, bowling..." name="eventName" required />

									<label htmlFor="eventDates">Date & Heure</label>
									<div className={styles.detailsAddInputs} name="eventDates">
										<div>
											<label htmlFor="eventDateTimeStart">Début</label>
											<input id="eventDateTimeStart" className={utilStyles.userInput} type="datetime-local" name="eventDateTimeStart" required />
										</div>
										<div>
											<label htmlFor="eventDateTimeEnd">Fin</label>
											<input id="eventDateTimeEnd" className={utilStyles.userInput} type="datetime-local" name="eventDateTimeEnd" required />
										</div>
									</div>

									<label htmlFor="eventDescription">Description</label>
									<input id="eventDescription" className={utilStyles.userInput} type="textarea" placeholder="Lorem ipsum..." name="eventDescription" required />

									<label htmlFor="eventLocation">Endroit</label>
									<input id="eventLocation" className={utilStyles.userInput} type="text" placeholder="Rouen, en ligne..." name="eventLocation" required />

									<button className={utilStyles.userInput} type="submit">Ajouter l'événement</button>
								</form>
							</div>
						</>
						: events.length === 0
						?
						<>
							<h2 className={styles.detailsTitle}>Pas d'événements prévus</h2>
						</>
						:
						<>
							<h2 className={styles.detailsTitle}>{events[selectedEventIndex].name}</h2>
							<div className={styles.detailsFull}>
								<p>
									<FontAwesomeIcon
										icon={faCalendarDays}
										className={`fa-fw ${utilStyles.accentDark}`}
									/>
									{" "}
									{getDateTime(events[selectedEventIndex].date.start)}
								</p>
								<p>
									<FontAwesomeIcon
										icon={faLocationDot}
										className={`fa-fw ${utilStyles.accentDark}`}
									/>
									{" "}
									{events[selectedEventIndex].location}
								</p>
								<p>
									<FontAwesomeIcon
										icon={faCircleQuestion}
										className={`fa-fw ${utilStyles.accentDark}`}
									/>
									{" "}
									{events[selectedEventIndex].description}
								</p>
							</div>
						</>
					}
				</div>
			</div>
		</section>
	)
}