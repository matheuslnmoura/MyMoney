import React from 'react';
import * as S from './ButtonStyle';

export type Props = {
	text: string,
	width: string,
	height: string,
	color: string,
	background: string
}

const Button: React.FC<Props> = (props: Props) => {
	return (
		<S.ButtonComponent 
			text = {props.text}
			width = {props.width}
			height = {props.height}
			color = {props.color}
			background = {props.background}	
		>{props.text}</S.ButtonComponent>
	);
};

export default Button;