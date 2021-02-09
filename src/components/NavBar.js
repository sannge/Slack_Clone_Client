import React, { useEffect, useState } from "react";
import SlackLogo from "./SlackLogo";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
	background: #f6efe8;
	& .nav-bar {
		padding: 25px;
		max-width: 1260px;
		margin: auto;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .stable-nav-bar {
		position: fixed;
		width: 100%;
		padding: 25px;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		transition: all 0.3s ease-in-out;
		z-index: 1;
		max-width: 1260px;
		left: 50%;
		transform: translateX(-50%);
	}
`;

function NavBar() {
	const [showBar, setShowBar] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			const scrollLength = e.target.scrollingElement.scrollTop;
			if (scrollLength > 80) {
				if (!showBar) {
					setShowBar(true);
				}
			} else if (scrollLength <= 80) {
				setShowBar(false);
			}
		});
	}, []);
	return (
		<Wrapper>
			<div className={!showBar ? "nav-bar" : "stable-nav-bar"}>
				<div>
					<Link to='/'>
						<SlackLogo pointer />
					</Link>
				</div>
				<div
					style={{
						flex: 0.15,
						display: "flex",
						alignItems: "center",
						justifySelf: "end",
					}}>
					<Icon
						name='search'
						style={{
							marginRight: "30px",
							fontSize: "1.2rem",
							cursor: "pointer",
						}}
					/>
					<Icon name='bars' style={{ fontSize: "1.2rem", cursor: "pointer" }} />
				</div>
			</div>
		</Wrapper>
	);
}

export default NavBar;
