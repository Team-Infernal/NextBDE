import Image from "next/image";

import config from "../../config/config.json";
import utilStyles from "../../styles/utils.module.scss";
import styles from "./about.module.scss";

export default () => {
	return (
		<section className={styles.about}>
			<div className={styles.textContainer}>
				<h1 className={`${styles.title} ${utilStyles.fancyText}`}>{config.site.name}</h1>
				<h2 className={styles.subtitle}>
					A propos de nous
				</h2>
				<p className={styles.content}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste at, ipsam deserunt deleniti molestiae voluptatibus. Excepturi cupiditate a, id asperiores aperiam sunt laudantium tenetur natus omnis libero aliquid, non cum nemo commodi quisquam sequi voluptate.</p>
			</div>
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					priority
					src="/images/about.png"
					width={380}
					height={380}
					layout="intrinsic"
					alt={config.name}
				/>
			</div>
		</section>
	);
}