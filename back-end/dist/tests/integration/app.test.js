var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import app from '../../src/app.js';
import supertest from 'supertest';
import prisma from '../../src/config/database.js';
import scenarioFactory from '../factories/scenarioFactory.js';
import userFactory from '../factories/userFactory.js';
const agent = supertest(app);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield scenarioFactory.deleteAllData();
}));
describe('POST/signup', () => {
    it('Given valid inputs, should register a new user on database', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = userFactory.user(true);
        yield agent.post('/signup').send(userInfo);
        const insertedUser = yield prisma.user.findFirst({
            where: { email: userInfo.email }
        });
        expect(insertedUser).not.toBeNull();
    }));
    it('Given invalid inputs, should return an error message object', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = userFactory.user(false);
        const response = yield agent.post('/signup').send(userInfo);
        expect(response.body.name &&
            response.body.email &&
            response.body.password &&
            response.body.birthday).not.toBeNull();
    }));
    it('Given an email that is already registred, should return status 409', () => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password, birthday } = yield scenarioFactory.registerUser();
        const response = yield agent.post('/signup').send({ name, email, password, birthday });
        expect(response.status).toBe(409);
    }));
});
describe('POST/signin', () => {
    it('Given valid inputs, should return logged in user object', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = yield scenarioFactory.registerUser();
        const response = yield agent.post('/signin').send({ email, password });
        expect(response.body.id &&
            response.body.name &&
            response.body.email &&
            response.body.birthday &&
            response.body.createdAt &&
            response.body.token).not.toBeUndefined();
    }));
    it('Given empty inputs, should return error message object', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/signin').send();
        expect(response.body.email &&
            response.body.password).not.toBeUndefined;
    }));
    it('Given an email that is not registred, should respond with 404 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = userFactory.user(true);
        const response = yield agent.post('/signin').send({ email, password });
        expect(response.status).toBe(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
