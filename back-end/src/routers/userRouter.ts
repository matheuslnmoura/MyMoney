import { Router } from 'express';

import userController from '../controllers/userController.js';
import userValidations from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.post('/signin', userValidations.validadeSignInInfo, userController.create);

export default userRouter;