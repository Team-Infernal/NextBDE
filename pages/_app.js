import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Layout from "../components/layout";
import "../styles/global.scss";

export default ({ Component, pageProps }) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	)
}