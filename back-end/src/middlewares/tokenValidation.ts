/* eslint-disable no-mixed-spaces-and-tabs */
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userRepository from '../repositories/userRepository.js';
import { User } from '@prisma/client';
import chalk from 'chalk';

dotenv.config();

const tokenValidation = {
	isValid
};

export default tokenValidation;

async function isValid(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if(!authorization){
		console.log(chalk.bold.red('Missing Token.'));
		throw{code: 400, message: 'Unable to login. Try again.'};
	}
  
	if(authorization.slice(0, 7) !== 'Bearer ') {
		console.log(chalk.bold.red('Invalid authorization header'));
		throw {code: 401, message: 'Unable to login. Try again.'};
	}
  
	const token = authorization.split(' ')[1];
  
  interface JwtPayload {
    id: number;
	}
    
  try {
  	const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  	const{ id } = decoded;

  	const user: User = await userRepository.findById(id);
  	
  	res.locals.user = user;
  	next();		
		
  } catch (error) {
  	if(error.name === 'TokenExpiredError') {
  		console.log(chalk.bold.red('Expired Token'));
  		return res.status(401).send('Unable to login. Try again.');
  	}
  	if(error.name === 'JsonWebTokenError') {
  		console.log(chalk.bold.red('Invalid Token'));
  		return res.status(401).send('Unable to login. Try again.');
  	}
  	return res.sendStatus(500);
  }
}