import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { AppError } from '../../errors';

const duplicatedContactMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { name } = req.body;

	if (name) {
		const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

		const foundContact = await contactRepository.findOneBy({ name: name });

		if (foundContact) throw new AppError('Contact already exists.', 409);
	}

	return next();
};

export default duplicatedContactMiddleware;
