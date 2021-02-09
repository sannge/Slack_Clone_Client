import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
	background: #f5f5f5;
	& .gray-div {
		max-width: 1260px;
		margin: auto;
	}
	& .hero-header {
		font-size: calc(2rem + (18 * (100vw - 400px) / 624));
		font-family: Slack-Larsseit, "Helvetica Neue", Helvetica, "Segoe UI", Tahoma,
			Arial, sans-serif;
		font-weight: 700;
		line-height: 1.1875;
		letter-spacing: -0.8px;
		margin-top: 0;
		margin-bottom: 1rem;
		color: #1d1d1d;
		padding: 50px;
		padding-bottom: 10px;
		text-align: center;
	}
	& .quote {
		font-family: Slack-Larsseit, "Helvetica Neue", Helvetica, "Segoe UI", Tahoma,
			Arial, sans-serif;
		font-weight: 300;
		line-height: 1.35714286;
		letter-spacing: -0.3px;
		font-style: italic;
		margin-bottom: 1.5rem;
		font-size: 1.7rem;
		padding-right: 50px;
		padding-left: 50px;
	}

	@media (max-width: 768px) {
		& .football-area {
			flex-wrap: wrap;
		}

		& .quote {
			margin-top: 30px;
		}
	}
`;

function HeroSection3() {
	return (
		<Wrapper>
			<div>
				<div className='gray-div'>
					<h1 className='hero-header'>
						Over 750,000 companies use Slack to get work done
					</h1>
					<div style={{ width: "100%", textAlign: "center" }}>
						<a style={{ fontSize: "1.2rem" }} href='#'>
							See all customer stories <Icon name='arrow right' />
						</a>
					</div>
					<div
						className='football-area'
						style={{
							display: "flex",
							alignContent: "center",
							marginTop: "10px",
						}}>
						<div style={{ width: "100%", marginTop: "-35px" }}>
							<img
								style={{ width: "100%" }}
								src='https://a.slack-edge.com/a92aa/marketing/img/stories/fox/fox-sporting-event-highlights-tablet.png'
								alt=''
							/>
						</div>
						<span className='quote'>
							“Sporting event highlights that used to take hours from creation
							to approval and distribution are now able to be shared in
							near-real time through our social channels, thanks to Slack.”
							<div style={{ marginTop: "50px" }}>
								<img
									src='https://a.slack-edge.com/fb12d/marketing/img/stories/21stcenturyfox/fox-logo.png'
									alt=''
								/>
							</div>
							<div style={{ fontStyle: "normal", fontSize: "1.4rem" }}>
								<span style={{ fontWeight: "bold" }}>Paul Cheesbrough</span>,{" "}
								<span style={{ fontWeight: "350" }}>CTO</span>
							</div>
						</span>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default HeroSection3;
