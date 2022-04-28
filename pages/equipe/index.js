import { useSession } from "next-auth/react";
import AccessDenied from "../../components/accessDenied";

export default () => {
	const { data: session, status} = useSession();

	if (status === "authenticated") {
		return (
			<div>
				<h1>Equipe</h1>
				<p>Signed in as {session.user.name}</p>
			</div>
		)
	}

	return <AccessDenied />
}