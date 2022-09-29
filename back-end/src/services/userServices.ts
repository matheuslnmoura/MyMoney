import { User } from '@prisma/client';
import userRepository from '../repositories/userRepository.js';
import encryptionUtil from '../utils/encryptionUtil.js';
import formatDateUtil from '../utils/formatDateUtil.js';

const userServices = {
	create,
};

export default userServices;

export type UserSignUpInputData = Omit<User, 'id' | 'createdAt'> 

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
		throw {code: 409, message: 'This email is already Registred. Login instead.'};
	}
	return;
}