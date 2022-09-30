import { Router } from 'express';

import userController from '../controllers/userController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import userValidations from '../middlewares/userValidations.js';

const userRouter = Router();

userRouter.post('/signup', userValidations.validadeSignUpInfo, userController.create);
userRouter.post('/signin', userValidations.validadeSignInInfo, userController.signIn);
userRouter.get('/users', tokenValidation.isValid, userController.getUsers);

export default userRouter;