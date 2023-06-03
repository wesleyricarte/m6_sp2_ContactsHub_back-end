import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const adminTokenMiddleare = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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

		if (!req.user.admin) throw new AppError('Insufficient permission', 403);

		return next();
	});
};

export default adminTokenMiddleare;
