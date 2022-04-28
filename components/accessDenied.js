import Link from "next/link";
import { signIn } from "next-auth/react";

export default () => {
	const handleSignInClick = event => {
		event.preventDefault();
		signIn();
	}

	return (
		<>
			<h1>Access Denied</h1>
			<p>
				<Link href="/api/auth/signin">
					<a onClick={(e) => handleSignInClick(e)}>You must be signed in to view this page</a>
				</Link>
			</p>
		</>
	)
}