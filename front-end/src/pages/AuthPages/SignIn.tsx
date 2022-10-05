import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageContainer } from '../../components/ImageContainer/ImageContainerStyle';
import Input from '../../components/Inputs/Input';
import { TextContainer } from '../../components/TextContainer/TextContainerStyle';
import { useUser } from '../../contexts/userContext';
import analytics from './../../assets/images/analytics.png';
import * as S from './AuthStyles';
import { errorMessage } from './SignUp';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import globalStyles from '../../assets/styles/style';
import registrationApi from '../../services/registrationApi';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [errorMessages, setErrorMessages] = useState<errorMessage | Record<string, never> > ({});
	const {setUser} = useUser();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const signInResponse = await registrationApi.signIn({email, password});
			setUser(signInResponse);
			localStorage.setItem('user', JSON.stringify(signInResponse));
			navigate('/');
		} catch (error) {
			setErrorMessages(error.response.data);
		}
	};

	return (
		
		<>
			<S.Form onSubmit = { handleSubmit } >
				<ImageContainer >
					<img src={analytics} alt="" />
				</ImageContainer>
				<TextContainer>
					<h1>Welcome Back!</h1>
					<h2>Fill in your email and password to access your account </h2>
				</TextContainer>
				<S.InputsContainer>
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
				</S.InputsContainer>

				<Button 
					text = {'Continue'}
					width = {'65%'}
					height = {'50px'}
					color = {globalStyles.mainFontColor}
					background = {globalStyles.secondaryColor}	
				/>

				<S.RedirectLink>
					<Link to = {'/signup'} >Don&rsquo;t have an account? <span>Sign Up.</span></Link>
				</S.RedirectLink>
			</S.Form>
		
		</>
	);
};

export default SignIn;