import { Request, Response } from 'express';
import { loginService } from '../../services';

export const loginController = async (req: Request, res: Response): Promise<Response> => {
	const token: string = await loginService(req.body);

	return res.json({ token: token });
};
