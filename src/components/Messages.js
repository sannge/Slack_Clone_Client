import styled from "styled-components";

export default styled.div`
	grid-column: 3;
	grid-row: 2;
	padding: 20px;
	padding-bottom: 0px;
	display: flex;
	height: ${(props) => props.height}vh;
	overflow-y: auto;
	flex-direction: column-reverse;
`;
