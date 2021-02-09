import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 20px;
	background: #f6efe8;
	& .connect {
		font-weight: 600;
		margin-bottom: 1px;
	}
	& .hero-header {
		margin-top: 0;
		font-size: calc(2rem + (18 * (100vw - 400px) / 624));
		font-family: Slack-Larsseit, "Helvetica Neue", Helvetica, "Segoe UI", Tahoma,
			Arial, sans-serif;
		font-weight: 700;
		line-height: 1.1875;
		letter-spacing: -0.8px;
		margin-bottom: 1rem;
	}
	& .hero-text {
		margin-right: auto;
		margin-bottom: 2rem;
		font-size: calc(1.3rem + (2 * (100vw - 400px) / 624));
		font-weight: 400;
		line-height: 1.333;
		letter-spacing: -0.2px;
		margin-top: 0;
		padding-right: 80px;
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		width: 530px;
	}
	& .button-purple {
		appearance: none;
		background: #611f69;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 4px;
		text-align: center;
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		font-weight: 700;
		line-height: 1.28571429;
		letter-spacing: 0.8px;
		text-transform: uppercase;
		text-decoration: none;
		padding: 19px 40px 20px;
		display: block;
		width: 100%;
		transition: box-shadow 420ms cubic-bezier(0.165, 0.84, 0.44, 1),
			color 420ms cubic-bezier(0.165, 0.84, 0.44, 1),
			background 420ms cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	& .button-normal {
		margin-top: 20px;
		appearance: none;
		border: 1px solid #611f69;
		background: transparent;
		color: #611f69;
		cursor: pointer;
		border-radius: 4px;
		text-align: center;
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		font-weight: 700;
		line-height: 1.28571429;
		letter-spacing: 0.8px;
		text-transform: uppercase;
		text-decoration: none;
		padding: 19px 40px 20px;
		display: block;
		width: 100%;
		transition: box-shadow 420ms cubic-bezier(0.165, 0.84, 0.44, 1),
			color 420ms cubic-bezier(0.165, 0.84, 0.44, 1),
			background 420ms cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	& .small-tag {
		margin-top: 20px;
	}
	& .small-tag a {
		text-decoration: underline;
	}
	& .hero-image {
		justify-content: center;
		display: flex;
		align-items: flex-start;
	}
	& .hero-image img {
		margin-left: 0;
		width: 100%;
		max-width: 100%;
		height: auto;
		border: 0;
		margin-top: 25px;
	}

	@media (min-width: 768px) {
		& .container {
			display: flex;
		}
		align-items: center;
		& .left-side {
			width: 50%;
		}
		& .right-side {
			width: 50%;
		}
	}
`;

function HeroSection() {
	return (
		<>
			<Wrapper>
				<div
					className='container'
					style={{ maxWidth: "1260px", margin: "auto" }}>
					<div className='left-side'>
						<p className='connect'>SLACK CONNECT</p>
						<h1 className='hero-header'>
							Build stronger relationships with external partners
						</h1>
						<div className='hero-text'>
							<p>
								Speed up communication and work more securely with your partners
								by inviting them to a channel in Slack.
							</p>
						</div>
						<div>
							<button className='button-purple'>LEARN HOW</button>
							<button className='button-normal'>UPGRADE YOUR PLAN</button>
						</div>

						<div>
							<div className='small-tag'>
								*May not apply to all teams. More details <a href='#'> here.</a>
							</div>
						</div>
					</div>

					<div className='hero-image right-side'>
						<img
							src='https://a.slack-edge.com/fe98f/marketing/img/homepage/hp-existing-users/slack-connect-ui.png'
							alt=''
						/>
					</div>
				</div>
			</Wrapper>
		</>
	);
}

export default HeroSection;
