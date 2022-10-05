import api from './api';

type SignUpInputs = {
	name: string,
	email: string,
	password: string,
	birthday: string
}

const signUp = async (signUpInfo: SignUpInputs) => {
	const response = await api.post('/signup', signUpInfo);
	return response.data;
};

const signIn = async (signUpInfo: Omit<SignUpInputs, 'name' | 'birthday'>) => {
	const response = await api.post('/signin', signUpInfo);
	return response.data;
};

const registrationApi = {
	signUp,
	signIn
};

export default registrationApi;