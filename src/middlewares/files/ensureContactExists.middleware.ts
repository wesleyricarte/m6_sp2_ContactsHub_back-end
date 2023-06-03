import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { AppError } from '../../errors';

const ensureContactExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const foundContact = await contactRepository.findOneBy({ id: parseInt(req.params.id) });

	if (!foundContact) throw new AppError('Contact not found', 404);

	return next();
};

export default ensureContactExistsMiddleware;
