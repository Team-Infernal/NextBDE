import { getSession } from "next-auth/react";

export default async (req, res) => {
	const session = await getSession({ req });

	if (session) {
		res.send({
			content: "This is protected content.",
		});
	} else {
		res.send({
			content: "You must be signed in to access this API route.",
		});
	}
}