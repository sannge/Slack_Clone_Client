import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import HeroSection2 from "../components/HeroSection2";
import HeroSection3 from "../components/HeroSection3";
import HeroSection4 from "../components/HeroSection4";
import Footer from "../components/Footer";
import decode from "jwt-decode";

const Home = (props) => {
	useEffect(() => {
		if (
			localStorage.getItem("token") &&
			decode(localStorage.getItem("token"))
		) {
			props.history.push("/view-team");
		}
	});
	return (
		<div>
			<div>
				<NavBar />
			</div>
			<div>
				<HeroSection />
			</div>
			<div>
				<HeroSection2 />
			</div>
			<div>
				<HeroSection3 />
			</div>
			<div>
				<HeroSection4 />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
