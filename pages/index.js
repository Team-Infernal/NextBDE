import Head from "next/head";

import About from "../components/home/about";
import EventPreview from "../components/eventPreview/eventPreview";
import config from "../config/config.json";

export default () => {
	return (
		<div>
			<Head>
				<title>{config.site.name}</title>
			</Head>
			<About />
			<EventPreview />
		</div>
	);
}