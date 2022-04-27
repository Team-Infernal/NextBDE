import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default () => {
	const router = useRouter();
	const { id } = router.query;
	const [name, setName] = useState();

	useEffect(() => {
		if (!id) return;

		const fetchUser = async () => {
			const response = await fetch(`/api/events/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const user = await response.json();
			setName(user?.name);
		}

		fetchUser();
	}, [id]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data = await response.json();
		console.log("POST: ", data);
	}

	return (
		<div>
			<h1>Event form</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name ?? ""}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}