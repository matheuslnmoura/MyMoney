import prisma from '../config/database.js';
import { UserSignUpInputData } from '../services/userServices.js';

const userRepository = {
	findByEmail,
	create
};

export default userRepository;

async function findByEmail(email: string) {
	return await prisma.user.findFirst({
		where:{
			email
		}
	});
}

async function create (userInfo: UserSignUpInputData) {
	return await prisma.user.create({
		data: userInfo
	});
}