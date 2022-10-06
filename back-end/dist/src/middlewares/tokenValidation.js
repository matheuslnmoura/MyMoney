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
import userRepository from '../repositories/userRepository.js';
import chalk from 'chalk';
dotenv.config();
const tokenValidation = {
    isValid
};
export default tokenValidation;
function isValid(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            console.log(chalk.bold.red('Missing Token.'));
            throw { code: 400, message: 'Unable to login. Try again.' };
        }
        if (authorization.slice(0, 7) !== 'Bearer ') {
            console.log(chalk.bold.red('Invalid authorization header'));
            throw { code: 401, message: 'Unable to login. Try again.' };
        }
        const token = authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = decoded;
            const user = yield userRepository.findById(id);
            res.locals.user = user;
            next();
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.log(chalk.bold.red('Expired Token'));
                return res.status(401).send('Unable to login. Try again.');
            }
            if (error.name === 'JsonWebTokenError') {
                console.log(chalk.bold.red('Invalid Token'));
                return res.status(401).send('Unable to login. Try again.');
            }
            return res.sendStatus(500);
        }
    });
}
