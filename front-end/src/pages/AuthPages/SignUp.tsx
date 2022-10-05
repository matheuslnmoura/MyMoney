import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './AuthStyles';
import analytics from './../../assets/images/analytics.png';
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import TextContainer from '../../components/TextContainer/TextContainer';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Button/Button';
import globalStyles from '../../assets/styles/style';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import registrationApi from '../../services/registrationApi';
import { useUser } from '../../contexts/userContext';

type errorMessage = {
	name?: string | null,
	email?: string | null,
	password?: string | null,
	birthday?: string | null
}

const SignUp = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [birthday, setBirthday] = useState('');
	const [errorMessages, setErrorMessages] = useState<errorMessage | Record<string, never> > ({});
	const navigate = useNavigate();
	const {setUser} = useUser();


	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setErrorMessages({});
		const signUpInputs = {name: userName, email, password, birthday};
		try {
			await registrationApi.signUp(signUpInputs);
			const signInResponse = await registrationApi.signIn({email, password});
			setUser(signInResponse);
			localStorage.setItem('user', JSON.stringify(signInResponse));
			navigate('/');
		} catch (error) {
			setErrorMessages(error.response.data);
		}
	};
	return(
		<>
			<S.Form onSubmit = { handleSubmit } >
				<ImageContainer >
					<img src={analytics} alt="" />
				</ImageContainer>
				<TextContainer>
					<h1>Welcome</h1>
					<h2>Set your name and login details</h2>
				</TextContainer>
				<S.InputsContainer>
					<Input 
						type = {'text'} 
						name = {'Name'} 
						state = {userName}
						setState = {setUserName} 
						placeholder = {'John Doe'}
					/>
					<S.ErrorMessageContainer>
						{errorMessages.name}
					</S.ErrorMessageContainer>

					<Input 
						type = {'email'} 
						name = {'E-mail'} 
						state = {email}
						setState = {setEmail} 
						placeholder = {'john@doe.com'}
					/>
					<S.ErrorMessageContainer>
						{errorMessages.email}
					</S.ErrorMessageContainer>

					<Input 
						type = {passwordVisible? 'text' : 'password'} 
						name = {'Password'} 
						state = {password}
						setState = {setPassword} 
						placeholder = {'password'}
					>
						<div onClick = {() => {setPasswordVisible(!passwordVisible);} } >
							{passwordVisible ? <BsEyeSlash /> : <BsEye />}
						</div>
					</Input>
					<S.ErrorMessageContainer>
						{errorMessages.password}
					</S.ErrorMessageContainer>

					<Input 
						type = {'date'} 
						name = {'Birthday'} 
						state = {birthday}
						setState = {setBirthday} 
						placeholder = {'mm-dd-yyyy'}
					/>
					<S.ErrorMessageContainer>
						{errorMessages.birthday}
					</S.ErrorMessageContainer>

				</S.InputsContainer>
				<Button 
					text = {'Continue'}
					width = {'65%'}
					height = {'50px'}
					color = {globalStyles.mainFontColor}
					background = {globalStyles.secondaryColor}	
				/>
			</S.Form>
			
			<S.RedirectLink>
				<Link to = {'/signin'}>Already have an account? <span>Sign in</span></Link>
			</S.RedirectLink>
			
		</>
	);
};

export default SignUp;