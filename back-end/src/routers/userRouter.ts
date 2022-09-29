import { Router } from 'express';

import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/signin', userController.create);

export default userRouter;