import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import userRepository from '../repositories/userRepository.js';
import encryptionUtil from '../utils/encryptionUtil.js';
import formatDateUtil from '../utils/formatDateUtil.js';

const userServices = {
	create,
	signIn
};

export default userServices;

export type UserSignUpInputData = Omit<User, 'id' | 'createdAt'> 
export type UserSignInInputData = Omit<User, 'id' | 'name' | 'birthday' | 'createdAt'> 

async function create(userInfo: UserSignUpInputData) {
	const { email, password, birthday } = userInfo;
	await checkIfEmailUnique(email);
	const hashPassword = encryptionUtil.encryptPassword(password);
	const formatedBirthday = formatDateUtil.createDate(birthday);
	const encryptedInfo = {
		...userInfo,
		password: hashPassword,
		birthday: formatedBirthday
	};
	const registredUser = await userRepository.create(encryptedInfo);
	return registredUser;
}

async function checkIfEmailUnique(email: string) {
	const dbEmail = await userRepository.findByEmail(email);
	if(dbEmail) {
		throw {code: 409, message: {email:'This email is already Registred. Login instead.'}};
	}
	return;
}

async function signIn(userInfo: UserSignInInputData) {
	const {email, password} = userInfo;
	const dbUser = await checkIfRegistred(email);
	const {id, password: hashPassword} = dbUser;
	encryptionUtil.comparePassword(password, hashPassword);
	const token = await createToken(id);
	delete dbUser.password;
	return {...dbUser, token};
}

async function checkIfRegistred(email: string) {
	const user = await userRepository.findByEmail(email);
	if(!user) {
		throw {code: 404, message: 'User not found. Sign up instead.'};
	}
	return user;
}

async function createToken(id: number) {
	return jwt.sign({id}, process.env.JWT_SECRET);
}