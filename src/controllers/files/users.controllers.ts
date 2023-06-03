import { Request, Response } from 'express';
import { iUserUpdate, iUserReturn, iUserReturnArray } from '../../interfaces';
import { createUsersService, deleteUsersService, readContactsByUserService, readUsersService, retrieveUserService, updateUsersService } from '../../services';

export const createUsersController = async (req: Request, res: Response): Promise<Response> => {
	const newUser: iUserReturn = await createUsersService(req.body);

	return res.status(201).json(newUser);
};

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
	const users: iUserReturnArray = await readUsersService();

	return res.status(200).json(users);
};

export const retrieveUsersController = async (req:Request, res: Response): Promise<Response> => {
	const userId: number = parseInt(req.params.id);
    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin

    const user: iUserReturn = await retrieveUserService(userId, thisUserId, thisUserAdmin)

    return res.json(user);
}

export const readContactsByUserController = async (req:Request, res: Response): Promise<Response> => {
	const userId: number = parseInt(req.params.id);

    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin

    const user: iUserReturn = await readContactsByUserService(userId, thisUserId, thisUserAdmin)

    return res.json(user);
}

export const updateUsersController = async (req: Request, res: Response): Promise<Response> => {
	const newUserData: iUserUpdate = req.body;
	const userId: number = parseInt(req.params.id);
    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin

	const updatedUser: iUserReturn = await updateUsersService(newUserData, userId, thisUserId, thisUserAdmin);

	return res.json(updatedUser);
};

export const deleteUsersController = async (req: Request, res: Response): Promise<Response> => {
	const userId: number = parseInt(req.params.id);
	await deleteUsersService(userId);

    return res.status(204).send()
};
