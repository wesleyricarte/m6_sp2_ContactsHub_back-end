import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';

const duplicatedUsersMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { email } = req.body;

	if (email) {
		const userRepository: Repository<User> = AppDataSource.getRepository(User);

		const foundUser = await userRepository.findOneBy({ email: email });

		if (foundUser) throw new AppError('User already exists', 409);
	}

	return next();
};

export default duplicatedUsersMiddleware;