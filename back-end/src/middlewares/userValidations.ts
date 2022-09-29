import joi from 'joi';
import DateExtension from '@joi/date';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

const JoiDate = joi.extend(DateExtension);

const userValidations = {
	validadeSignUpInfo
};

export default userValidations;

function validadeSignUpInfo(req: Request, res: Response, next: NextFunction) {
	const userInfo = req.body;
	const userInfoSchema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().min(4).required(),
		name: joi.string().min(3).required(),
		birthday: JoiDate.date().format('YYYY-MM-DD').required()
	});

	const {error} = userInfoSchema.validate(userInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		const errorMessagesObj = {
			name: null,
			password: null,
			email: null,
			birthday: null,
		};
		error.details.forEach(detail => {
			if(detail.context.key === 'name') {
				errorMessagesObj.name = 'Your name should be at least three characters long.';
			}
			if(detail.context.key === 'email') {
				errorMessagesObj.email = 'Invalid email.';
			}
			if(detail.context.key === 'password') {
				errorMessagesObj.password = 'Your password must be at least four characters long.';
			}
			if(detail.context.key === 'birthday') {
				errorMessagesObj.birthday = 'Invalid birthdate.';
			}
		});
		throw{code: 422, message: errorMessagesObj};
	}
	next();
}