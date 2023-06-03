import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';

const validUserMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const foundUser = await userRepository.findOneBy({
		id: parseInt(req.params.id),
	});

	if (!foundUser) throw new AppError('User not found', 404);

	if (foundUser.deletedAt) throw new AppError('Inactive user', 404);

	return next();
};

export default validUserMiddleware;
