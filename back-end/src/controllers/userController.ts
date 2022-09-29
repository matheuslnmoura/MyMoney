import { Request, Response } from 'express';

const userController = {
	create
};

export default userController;

async function create(req: Request, res: Response) {
	res.status(201).send('Rota funcionando');
}