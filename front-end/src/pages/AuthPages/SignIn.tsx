import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './AuthStyles';

const SignIn = () => {
	return(
		<>
			<h1>Página de sign innn</h1>

			<S.RedirectLink>
				<Link to = {'/signup'} >Don&rsquo;t have an account? <span>Sign Up.</span></Link>
			</S.RedirectLink>
		
		</>
	);
};

export default SignIn;