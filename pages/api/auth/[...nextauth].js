import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";

const options = {
	providers: [
		CredentialsProvider({
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				const res = await fetch("/your/endpoint", {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" }
				});
				const user = await res.json();
				if (res.ok && user) return user;
				return null;
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_ID,
			clientSecret: process.env.DISCORD_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
		}),
	],
	pages: {
		signIn: "/connexion",
		// signOut: "/deconnexion",
	},
	debug: false,
};

export default (req, res) => NextAuth(req, res, options);