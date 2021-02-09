import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	& .purple-div {
		background: #4a154b;
		border: none;
		clip-path: ellipse(75% 100% at center top);
		height: auto;
		min-height: 370px;
	}

	& h1 {
		color: #fff;
		margin-bottom: 2rem;
		font-size: calc(2rem + (18 * (100vw - 400px) / 624));
		font-family: Slack-Larsseit, "Helvetica Neue", Helvetica, "Segoe UI", Tahoma,
			Arial, sans-serif;
		font-weight: 700;
		line-height: 1.1875;
		letter-spacing: -0.8px;
		margin-top: 0;
		text-align: center;
		padding-top: 60px;
	}

	& .white-button {
		background-color: #fff;
		color: #611f69;
		fill: #611f69;
		font-size: calc(0.875rem + (0 * (100vw - 400px) / 624));
		appearance: none;
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
		width: 70%;
		// paddingLeft: 50px;
		display: block;
	}
	& .purple-button {
		appearance: none;
		border: 1px solid white;
		color: white;
		cursor: pointer;
		border-radius: 4px;
		text-align: center;
		font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
			Tahoma, Arial, sans-serif;
		font-weight: 700;
		line-height: 1.28571429;
		letter-spacing: 0.8px;
		font-size: 0.875rem;
		text-transform: uppercase;
		text-decoration: none;
		padding: 19px 40px 20px;
		display: block;
		width: 70%;
		font-size: calc(0.875rem + (0 * (100vw - 400px) / 624));
		background: transparent;
	}

	@media (min-width: 768px) {
		& .inside-div {
			max-width: 1260px;
			margin: auto;
		}

		& .button-group {
			display: flex;
			justify-content: center;
		}
	}
`;

function HeroSection4() {
	return (
		<Wrapper>
			<div className='purple-div'>
				<div className='inside-div'>
					<h1>Choose a better way to work</h1>
					<div className='button-group'>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								marginTop: "20px",
							}}>
							<button className='white-button'>TRY FOR FREE</button>
						</div>

						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								marginTop: "20px",
							}}>
							<button className='purple-button'>TALK TO SALES</button>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default HeroSection4;
