import { Router } from 'express';

import userController from '../controllers/userController.js';
import userValidations from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.post('/signup', userValidations.validadeSignUpInfo, userController.create);
userRouter.post('/sgin');

export default userRouter;