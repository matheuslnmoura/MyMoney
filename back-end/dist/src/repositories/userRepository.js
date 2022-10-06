var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
const userRepository = {
    findByEmail,
    findById,
    create
};
export default userRepository;
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findFirst({
            where: {
                email
            }
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: {
                id
            }
        });
    });
}
function create(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.create({
            data: userInfo
        });
    });
}
