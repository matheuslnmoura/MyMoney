import React from 'react';
import * as S from './ImageContainerStyle';

type Props = {
	children: JSX.Element
}

const ImageContainer: React.FC<Props> = ({children}) => {
	return (
		<S.ImageContainer>
			{children}
		</S.ImageContainer>
	);
};

export default ImageContainer;