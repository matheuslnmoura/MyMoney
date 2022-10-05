import styled from 'styled-components';
import { Props } from './Button';

export const ButtonComponent = styled.button<Props> `
	width: ${props => props.width};
	height: ${props => props.height};
	color: ${props => props.color};
	background: ${props => props.background};
	border-radius: 20px;
	border: none;
	font-size: 16px;
	font-family:'Questrial', sans-serif;
	margin-top: 30px;
`;