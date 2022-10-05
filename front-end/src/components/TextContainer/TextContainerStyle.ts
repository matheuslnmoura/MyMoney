import styled from 'styled-components';
import globalStyles from '../../assets/styles/style';

export const TextContainer = styled.div`
	color: ${globalStyles.mainFontColor};
	text-align: center;
	margin-top: 20px;

	h1 {
		font-size: 20px;
		margin-bottom: 8px;
	}

	h2 {
		font-size: 10px;
		color: ${globalStyles.secondaryFontColor}
	}
`;