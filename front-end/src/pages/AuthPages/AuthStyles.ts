import styled from 'styled-components';
import globalStyles from '../../assets/styles/style';

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const InputsContainer = styled.div`
	width: 65%;
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ErrorMessageContainer = styled.span`
	margin: -5px 0px 10px 10px;
	color: ${globalStyles.redFontColor};
	transition: all ease 10s;
	align-self: flex-start;
`;

export const RedirectLink = styled.span`
	margin-top: 20px;

	a {
		text-decoration: none;
	}
	
	span {
		text-decoration: underline;
	}

`;
