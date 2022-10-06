var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userServices from '../services/userServices.js';
const userController = {
    create,
    signIn,
    getUsers
};
export default userController;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = req.body;
        yield userServices.create(userInfo);
        res.sendStatus(201);
    });
}
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = req.body;
        const response = yield userServices.signIn(userInfo);
        res.status(200).send(response);
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.sendStatus(200);
    });
}
