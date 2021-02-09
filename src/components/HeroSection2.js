import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	padding: 20px;
	max-width: 1260px;
	margin: auto;
	& .hero-header {
		font-family: Slack-Larsseit, "Helvetica Neue", Helvetica, "Segoe UI", Tahoma,
			Arial, sans-serif;
		font-weight: 700;
		line-height: 1.1875;
		letter-spacing: -0.8px;
		margin-top: 20px;
		margin-bottom: 1rem;
		font-size: calc(2rem + (18 * (100vw - 400px) / 624));
	}
	& p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-size: calc(1.3rem + (0 * (100vw - 400px) / 624));
	}
	& .hero-section-2-p {
		margin-top: 20px;
		margin-bottom: 1rem !important;
		padding-right: 20px;
		font-size: calc(1.3rem + (0 * (100vw - 400px) / 624));
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		font-weight: 400;
		line-height: 1.44444444;
		letter-spacing: normal;
		margin: 0;
	}
	& .learn-more {
		font-size: calc(1.6rem + (0 * (100vw - 400px) / 624));
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		line-height: 1.44444444;
		letter-spacing: normal;
		font-size: 1.125rem;
		display: inline-block;
		margin-bottom: 0;
		font-weight: 400;
		color: #1264a3;
		cursor: pointer;
		text-decoration: none;
		word-break: break-word;
	}

	& .video {
		width: 100%;
	}
	@media (min-width: 1024px) {
		& .letter-video-div {
			display: flex;
			flex-direction: row-reverse;
			margin-top: -50px;
		}
		& .letter-div {
			width: 50%;
			padding-left: 50px;
			padding-right: 50px;
			padding-top: 50px;
		}

		& .video-div {
			width: 50%;
		}
	}
`;

function HeroSection2() {
	return (
		<Wrapper>
			<div className='letter-video-div'>
				<div className='letter-div'>
					<div>
						<h1 className='hero-header'>
							Bring your team together in channels
						</h1>
					</div>
					<div>
						<p className='hero-section-2-p'>
							A channel is the place for everything related to a project, topic
							or team. Everyone in a channel sees the same messages and stays on
							the same page.
						</p>
					</div>

					<div>
						<a href='#' className='learn-more'>
							<span
								style={{
									fontSize: "calc(1.3rem + (0 * (100vw - 400px) / 624))",
								}}>
								Learn more about channels
							</span>{" "}
							<Icon
								style={{
									fontSize: "calc(1.3rem + (0 * (100vw - 400px) / 624))",
								}}
								name='arrow right'
							/>
						</a>
					</div>
				</div>
				<div className='video-div' style={{ marginTop: "25px" }}>
					<video
						className='video'
						poster='https://a.slack-edge.com/9b527/marketing/img/homepage/hp-prospect/channels/image/bring-your-team-together-in-channels.jpg'
						autoPlay
						muted
						loop
						playsInline>
						<source
							type='video/webm'
							src='https://a.slack-edge.com/5f6f2/marketing/img/homepage/hp-prospect/channels/bring-your-team-together-in-channels.webm'
						/>
						<source
							type='video/mp4'
							src='https://a.slack-edge.com/5f6f2/marketing/img/homepage/hp-prospect/channels/bring-your-team-together-in-channels.mp4'
						/>
					</video>
				</div>
			</div>
			<div style={{ marginTop: "60px" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignContent: "center",
					}}>
					<div style={{ width: "30%" }}>
						<div>
							<Icon
								style={{ fontSize: "3rem", color: "steelblue" }}
								name='file alternate outline'
							/>
						</div>
						<div style={{ marginTop: "10px" }}>
							<a
								style={{ fontSize: "1.3rem", textDecoration: "underline" }}
								href='#'>
								Share files
							</a>
						</div>
						<p>Keep files and the messages about them together in channels.</p>
					</div>
					<div style={{ width: "30%" }}>
						<div>
							<Icon
								style={{ fontSize: "3rem", color: "steelblue" }}
								name='call'
							/>
						</div>
						<div style={{ marginTop: "10px" }}>
							<a
								style={{ fontSize: "1.3rem", textDecoration: "underline" }}
								href='#'>
								Connect on a call
							</a>
						</div>
						<p>
							If working face to face is easier, go from channel to voice or
							video call in a click.
						</p>
					</div>
					<div style={{ width: "30%" }}>
						<div>
							<Icon
								style={{ fontSize: "3rem", color: "steelblue" }}
								name='connectdevelop'
							/>
						</div>
						<div style={{ marginTop: "10px" }}>
							<a
								style={{ fontSize: "1.3rem", textDecoration: "underline" }}
								href='#'>
								Share files
							</a>
						</div>
						<p>
							Work faster with external clients, vendors and more by working in
							a channel.
						</p>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default HeroSection2;
