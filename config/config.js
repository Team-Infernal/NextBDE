export default {
	name: "NextBDE",
	location: {
		name: "CESI Rouen",
		link: "https://goo.gl/maps/hPD9r2huAapAYFHr7",
	},
	router: {
		home: {
			name: "Accueil",
			path: "/",
			location: ["navbar"],
		},
		team: {
			name: "Equipe",
			path: "/equipe",
			location: ["navbar"],
		},
		events: {
			name: "Evenements",
			path: "/evenements",
			location: ["navbar"],
		},
		store: {
			name: "Boutique",
			path: "/boutique",
			location: ["navbar"],
		},
		terms: {
			name: "Conditions d'utilisation",
			path: "/conditions-utilisation",
			location: ["footer"],
		},
		privacy: {
			name: "Confidentialité",
			path: "/confidentialite",
			location: ["footer"],
		},
		signin: {
			name: "Se connecter",
			path: "/connexion",
			location: [],
		},
		signout: {
			name: "Se déconnecter",
			path: "/api/auth/signout",
			location: [],
		},
	},
	"auth": {
		"providers": [
			{
				"name": "Google",
				"icon": "faGoogle",
			},
			{
				"name": "Discord",
				"icon": "faDiscord",
			},
			{
				"name": "Twitter (Legacy)",
				"icon": "faTwitter",
			},
		],
	},
	"contact": {
		"email": "dev@teaminfernal.fr",
	},
	host: {
		name: "Infernal",
		link: "https://teaminfernal.fr",
		rights: "© 2022",
	},
}