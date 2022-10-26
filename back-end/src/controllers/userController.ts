import { Request, Response } from 'express';
import userServices from '../services/userServices.js';

const userController = {
	create,
	signIn,
	getUsers
};

export default userController;

async function create(req: Request, res: Response) {
	const userInfo = req.body;

	await userServices.create(userInfo);

	res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
	const userInfo = req.body;

	const response = await userServices.signIn(userInfo);

	res.status(200).send(response);
}

async function getUsers(req: Request, res: Response) {
	res.status(200).send("(Maybe) It's working!");
}