import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";

import config from "../../config/config.json";
import utilStyles from "../../styles/utils.module.scss";
import styles from "./footer.module.scss";

export default () => {
	const [quotes, setQuotes] = useState(null);

	useEffect(() => {
		setQuotes(config.quotes);
	}, [])

	const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<div className={styles.firstContent}>
					<h3>{config.site.name}</h3>
					<h4>
						<FontAwesomeIcon icon={faEnvelope} className={`fa-fw ${utilStyles.accent}`} />
						{" "}
						<Link href={config.site.email.link}>
							<a className={utilStyles.fancyLink}>{config.site.email.name}</a>
						</Link>
					</h4>
					<h4>
						<FontAwesomeIcon icon={faLocationDot} className={`fa-fw ${utilStyles.accent}`} />
						{" "}
						<Link href={config.site.location.link}>
							<a className={utilStyles.fancyLink} target="_blank" rel="noreferrer">{config.site.location.name}</a>
						</Link>
					</h4>
				</div>
				<div className={styles.secondContent}>
					<p>{quotes ? getRandomQuote() : ""}</p>
				</div>
			</div>
			<div className={styles.links}>
				<div className={styles.info}>
					<span>
						<Link href={config.site.terms.path}>
							<a className={utilStyles.fancyLink}>{config.site.terms.name}</a>
						</Link>
					</span>
					<span>
						<Link href={config.site.privacy.path}>
							<a className={utilStyles.fancyLink}>{config.site.privacy.name}</a>
						</Link>
					</span>
					<span>
						<Link href={config.site.host.link}>
							<a className={utilStyles.fancyLink}>Powered by {config.site.host.name}</a>
						</Link>
						{" "}
						<span className={styles.rights}>{config.site.rights}</span>
					</span>
				</div>
				<div className={styles.contact}>
					<Link href="https://twitter.com">
						<a target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faTwitter} className={`fa-fw ${styles.logo}`} />
						</a>
					</Link>
					<Link href="https://instagram.com">
						<a target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faInstagram} className={`fa-fw ${styles.logo}`} />
						</a>
					</Link>
					<Link href="https://discord.com">
						<a target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faDiscord} className={`fa-fw ${styles.logo}`} />
						</a> 
					</Link>
				</div>
			</div>
		</footer>
	)
}