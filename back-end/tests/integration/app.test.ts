import app from '../../src/app.js';
import supertest from 'supertest';
import prisma from '../../src/config/database.js';
import scenarioFactory from '../factories/scenarioFactory.js';
import userFactory from '../factories/userFactory.js';

const agent = supertest(app);

beforeEach(async () =>{
	await scenarioFactory.deleteAllData();
});

describe('POST/signup', () => {
	it('Given valid inputs, should register a new user on database', async () => {
		const userInfo = userFactory.user(true);
		await agent.post('/signup').send(userInfo);

		const insertedUser = await prisma.user.findFirst({
			where:{email: userInfo.email}
		});

		expect(insertedUser).not.toBeNull();
	});

	it('Given invalid inputs, should return an error message object', async () => {
		const userInfo = userFactory.user(false);
		const response = await agent.post('/signup').send(userInfo);
		expect(
			response.body.name && 
			response.body.email &&
			response.body.password && 
			response.body.birthday
		).not.toBeNull();
	});

	it('Given an email that is already registred, should return status 409', async () => {
		const {name, email, password, birthday} = await scenarioFactory.registerUser();
		const response = await agent.post('/signup').send({name, email, password, birthday});

		expect(response.status).toBe(409);
	});
});

describe('POST/signin', () => {
	it('Given valid inputs, should return logged in user object', async () => {
		const { email, password } = await scenarioFactory.registerUser();
		const response = await agent.post('/signin').send({email, password});

		expect(
			response.body.id && 
			response.body.name && 
			response.body.email &&
			response.body.birthday &&
			response.body.createdAt &&
			response.body.token
		).not.toBeUndefined();
	});

	it('Given empty inputs, should return error message object', async () => {
		const response = await agent.post('/signin').send();
		expect(
			response.body.email &&
			response.body.password
		).not.toBeUndefined;
	});

	it('Given an email that is not registred, should respond with 404 status code', async () => {
		const {email, password} = userFactory.user(true);
		const response = await agent.post('/signin').send({email, password});

		expect(response.status).toBe(404);
	});

});

afterAll(async () => {
	await prisma.$disconnect();
});