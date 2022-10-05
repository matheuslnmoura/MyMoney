import styled from 'styled-components';
import globalStyles from '../../assets/styles/style';

export const Fieldset = styled.fieldset`
	width: 100%;
	height: 50px;
	color: ${globalStyles.mainFontColor};
	border: 1px solid #2C3D51;
	border-radius: 20px;
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: space-around;
	box-sizing: border-box;
	margin-bottom: 15px;

	legend {
		margin-left: 15px;
	}


	.wrapper {
		width: 90%;
		display: flex;
		align-items: center;
	}

	input {
		width: 95%;
		height: 30px;
		border-radius: 20px;
		background: ${globalStyles.mainColor} !important; 
		border: none;
		outline: none;
		color: ${globalStyles.mainFontColor};
		padding: 0;
		padding-left: 8px;
		font-family: ${globalStyles.fontFamily};
		color-scheme: dark;
	}

	input::-webkit-input-placeholder { /* Edge */
  	font-style: italic;
	}	

	input:-ms-input-placeholder { /* Internet Explorer 10-11 */
		font-style: italic;
	}

	input::placeholder {
		font-style: italic;
	}

	input:-internal-autofill-selected {
		background-color: ${globalStyles.mainColor} !important;
		color: ${globalStyles.mainFontColor} !important;
		appearance: none;

	}
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
    transition: background-color 15000s ease-in-out 0s;
		-webkit-text-fill-color: ${globalStyles.mainFontColor} !important;
}

`;