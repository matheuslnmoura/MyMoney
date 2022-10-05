import React from 'react';
import * as S from './InputStyle';

type Props = {
	type: string,
	name: string,
	state: string,
	setState: React.Dispatch<React.SetStateAction<string>>, 
	children?: JSX.Element,
	placeholder?: string,
}

const Input: React.FC<Props> = (props: Props) => {
	const {type, name, placeholder, state, setState, children} = props;
	return (
		<S.Fieldset>
			<legend>{name}</legend>
			<div className="wrapper">
				<input type = {type} name = {name} placeholder = {placeholder} value = {state} onChange = {event => setState(event.target.value)} />
				{children}
			</div>
		</S.Fieldset>
	);
};

export default Input;