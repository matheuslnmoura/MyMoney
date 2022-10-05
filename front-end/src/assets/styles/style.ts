import styled from 'styled-components';


const mainColor = '#01152D';
const secondaryColor = '#FF9D42';
const mainFontColor = '#FCFBFD';
const secondaryFontColor = '#4C586C';
const redFontColor = '#c1214e';
const fontFamily = '\'Questrial\', sans-serif;';

const PageContainer = styled.div`
	width: 100vw;
	min-height: 100vh;
	background: ${mainColor};
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${fontFamily};
	color: ${mainFontColor};
`;

const AppContainer = styled.main`
	@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');
	width: 100%;
	max-width: 500px;
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const globalStyles = {
	mainColor,
	secondaryColor,
	mainFontColor,
	secondaryFontColor,
	redFontColor,
	PageContainer,
	AppContainer,
	fontFamily
};


export default globalStyles;