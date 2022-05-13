import { signIn, getProviders, getSession, getCsrfToken } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import config from "../../config/config.json";
import styles from "./connexion.module.scss";
import utilStyles from "../../styles/utils.module.scss";

export default ({ providers }) => {
	const providerIcons = {
		Google: faGoogle,
		Discord: faDiscord,
		"Twitter (Legacy)": faTwitter,
	};

	const getProviderButton = provider => {
		if (config.auth.providers.find(configProvider => configProvider.name === provider.name)) {
			return (
				<div key={provider.name}>
					<FontAwesomeIcon
						icon={providerIcons[provider.name]}
						className={`fa-fw ${styles.icons}`}
						onClick={() => signIn(provider.id)}
					/>
				</div>
			)
		}
	}

	return (
		<div className={styles.pageContainer}>
			<div className={styles.loginContainer}>
				<h2 className={styles.loginTitle}>Connexion</h2>
				<div className={styles.loginOptions}>
					<div className={styles.providers}>
						{Object.values(providers).map(provider => getProviderButton(provider))}
						<div>
							<FontAwesomeIcon
								icon={faEnvelope}
								className={`fa-fw ${styles.icons}`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async context => {
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: {
				destination: "/",
			},
		}
	}

	return {
		props: {
			providers: await getProviders(context),
			csrfToken: await getCsrfToken(context),
		},
	}
}