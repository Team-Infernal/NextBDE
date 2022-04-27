import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

export default ({ children }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}