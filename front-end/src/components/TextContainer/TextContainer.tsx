import React from 'react';
import * as S from './TextContainerStyle';
type Props = {
	children: JSX.Element[]
}
const TextContainer: React.FC<Props> = ({children}) => {
	return(
		<S.TextContainer>
			{children}
		</S.TextContainer>
	);
};

export default TextContainer;