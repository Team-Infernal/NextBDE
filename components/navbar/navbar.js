import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import config from "../../config/config.json";
import utilStyles from "../../styles/utils.module.scss";
import styles from "./navbar.module.scss";

export default () => {
	const { links } = config.navbar;
	const { pathname } = useRouter();
	const [expanded, setExpanded] = useState(false);
	
	const getLinkClasses = (currentPath) => {
		const classes = [
			utilStyles.fancyLink,
			utilStyles.inverted,
			styles.link,
			currentPath === pathname ? utilStyles.fancyUnderline : "",
			currentPath === pathname ? styles.active : "",
			currentPath === "/api/auth/signin" ? styles.connection : "",
		]
		return classes.join(" ");
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.logoWrapper}>
				<p className={styles.logo}>&lt;Logo&gt;</p>
			</div>
			<div className={`
				${styles.linksContainer}
				${expanded ? styles.expanded : styles.minimized}
			`}>
				{links.map(link => (
					<Link key={link.name} href={link.path}>
						<a
							className={getLinkClasses(link.path)}
							onClick={() => setExpanded(false)}
						>{link.name}</a>
					</Link>
				))}
				<p className={styles.menuToggle} onClick={() => setExpanded(!expanded)}>
					<FontAwesomeIcon icon={faBars} className="fa-fw" />
				</p>
			</div>
		</nav>
	)
}