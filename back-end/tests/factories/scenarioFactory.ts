import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import prisma from '../../src/config/database';
import bcrypt from 'bcrypt';

async function deleteAllData() {
	await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE `;
	// await prisma.$executeRaw`TRUNCATE TABLE transactionTypes RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE transactions RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE cardsCompanies RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE cards RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE cardTransactions RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE accouts RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE accountTypes RESTART IDENTITY CASCADE`;
}

async function registerUser(): Promise<User> {
	const plainPassword = faker.internet.password();
	const response =  await prisma.user.create({
		data:{
			name: faker.name.fullName(),
			email: faker.internet.email(),
			password: bcrypt.hashSync(plainPassword, 10),
			birthday:faker.date.birthdate({min: 10, max: 100, mode: 'age'})
		}
	});
	return {...response, password: plainPassword};
}

const scenarioFactory = {
	deleteAllData,
	registerUser
};

export default scenarioFactory;