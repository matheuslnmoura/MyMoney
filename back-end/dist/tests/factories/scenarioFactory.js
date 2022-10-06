var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database';
import bcrypt from 'bcrypt';
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$executeRaw `TRUNCATE TABLE users RESTART IDENTITY CASCADE `;
        // await prisma.$executeRaw`TRUNCATE TABLE transactionTypes RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE transactions RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE cardsCompanies RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE cards RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE cardTransactions RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE accouts RESTART IDENTITY CASCADE`;
        // await prisma.$executeRaw`TRUNCATE TABLE accountTypes RESTART IDENTITY CASCADE`;
    });
}
function registerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const plainPassword = faker.internet.password();
        const response = yield prisma.user.create({
            data: {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(plainPassword, 10),
                birthday: faker.date.birthdate({ min: 10, max: 100, mode: 'age' })
            }
        });
        return Object.assign(Object.assign({}, response), { password: plainPassword });
    });
}
const scenarioFactory = {
    deleteAllData,
    registerUser
};
export default scenarioFactory;
