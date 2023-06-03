import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validTokenMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { authorization } = req.headers;

	if (!authorization) throw new AppError('Missing bearer token', 401);

	const token = authorization.split(' ')[1];

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		if (error) throw new AppError(error.message, 401);

		req.user = {
			id: parseInt(decoded.sub),
			admin: decoded.admin,
			deletedAt: decoded.deletedAt,
		};

		if (req.user.deletedAt) throw new AppError('Inactive user!', 401);

		return next();
	});
};

export default validTokenMiddleware;
