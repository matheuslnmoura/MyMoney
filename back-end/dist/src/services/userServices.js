var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function create(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, birthday } = userInfo;
        yield checkIfEmailUnique(email);
        const hashPassword = encryptionUtil.encryptPassword(password);
        const formatedBirthday = formatDateUtil.createDate(birthday);
        const encryptedInfo = Object.assign(Object.assign({}, userInfo), { password: hashPassword, birthday: formatedBirthday });
        const registredUser = yield userRepository.create(encryptedInfo);
        return registredUser;
    });
}
function checkIfEmailUnique(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbEmail = yield userRepository.findByEmail(email);
        if (dbEmail) {
            throw { code: 409, message: { email: 'This email is already Registred. Login instead.' } };
        }
        return;
    });
}
function signIn(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = userInfo;
        const dbUser = yield checkIfRegistred(email);
        const { id, password: hashPassword } = dbUser;
        encryptionUtil.comparePassword(password, hashPassword);
        const token = yield createToken(id);
        delete dbUser.password;
        return Object.assign(Object.assign({}, dbUser), { token });
    });
}
function checkIfRegistred(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.findByEmail(email);
        if (!user) {
            throw { code: 404, message: { email: 'User not found. Sign up instead.' } };
        }
        return user;
    });
}
function createToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return jwt.sign({ id }, process.env.JWT_SECRET);
    });
}
