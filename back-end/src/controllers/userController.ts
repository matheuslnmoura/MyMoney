import { Request, Response } from 'express';
import userServices from '../services/userServices.js';

const userController = {
	create
};

export default userController;

async function create(req: Request, res: Response) {
	const userInfo = req.body;

	await userServices.create(userInfo);

	res.sendStatus(201);
}