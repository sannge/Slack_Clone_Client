import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SlackLogo from "./SlackSmallLogo";

const Wrapper = styled.div`
	max-width: 1260px;
	margin: auto;
	& .nav-line {
	}
	& .nav-line ul {
		list-style: none;
	}
	& .nav-line ul a {
		color: #666666;
		line-height: 2.75;
		margin-left: -39px;
	}
`;

function Footer() {
	return (
		<Wrapper
			style={{
				marginTop: "50px",
				padding: "40px",
				display: "flex",
				flexWrap: "wrap",
			}}>
			<div style={{ marginRight: "40px", marginBottom: "40px" }}>
				<Link to='/'>
					<SlackLogo />
				</Link>
			</div>
			<div
				style={{
					flex: "1",
					display: "flex",
					paddingRight: "40px",
					justifyContent: "space-between",
					flexWrap: "wrap",
				}}>
				<div className='nav-line'>
					<h5>WHY SLACK?</h5>
					<ul>
						<li>
							<a href=''>Slack vs. Email</a>
						</li>
						<li>
							<a href=''>Channels</a>
						</li>
						<li>
							<a href=''>Engagement</a>
						</li>
						<li>
							<a href=''>Scale</a>
						</li>
						<li>
							<a href=''>Watch the Demo</a>
						</li>
					</ul>
				</div>
				<div className='nav-line'>
					<h5>PRODUCT</h5>
					<ul>
						<li>
							<a href=''>Features</a>
						</li>
						<li>
							<a href=''>Integrations</a>
						</li>
						<li>
							<a href=''>Enterprise</a>
						</li>
						<li>
							<a href=''>Solutions</a>
						</li>
					</ul>
				</div>
				<div className='nav-line'>
					<h5>PRICING</h5>
					<ul>
						<li>
							<a href=''>Plans</a>
						</li>
						<li>
							<a href=''>Paid vs. Free</a>
						</li>
					</ul>
				</div>
				<div className='nav-line'>
					<h5>RESOURCES</h5>
					<ul>
						<li>
							<a href=''>Partners</a>
						</li>
						<li>
							<a href=''>Developers</a>
						</li>
						<li>
							<a href=''>Apps</a>
						</li>
						<li>
							<a href=''>Blog</a>
						</li>
						<li>
							<a href=''>Help Center</a>
						</li>
						<li>
							<a href=''>Events</a>
						</li>
					</ul>
				</div>
				<div className='nav-line'>
					<h5>COMPANY</h5>
					<ul>
						<li>
							<a href=''>About Us</a>
						</li>
						<li>
							<a href=''>Leadership</a>
						</li>
						<li>
							<a href=''>Investor Relations</a>
						</li>
						<li>
							<a href=''>News</a>
						</li>
						<li>
							<a href=''>Media Kit</a>
						</li>
						<li>
							<a href=''>Careers</a>
						</li>
					</ul>
				</div>
			</div>
		</Wrapper>
	);
}

export default Footer;
