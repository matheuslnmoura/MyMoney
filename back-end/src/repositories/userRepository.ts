import prisma from '../config/database.js';
import { UserSignUpInputData } from '../services/userServices.js';

const userRepository = {
	findByEmail,
	findById,
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

async function findById(id: number) {
	return await prisma.user.findUnique({
		where:{
			id
		}
	});
}

async function create (userInfo: UserSignUpInputData) {
	return await prisma.user.create({
		data: userInfo
	});
}