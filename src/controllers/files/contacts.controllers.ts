import { iContactCreate } from '../../interfaces';
import { Request, Response } from 'express';
import { createContactService, deleteContactService, readContactsService, retrieveContactsService, updateContactService } from '../../services';

export const createContactController = async (req: Request, res: Response): Promise<Response> => {
	const contactData: iContactCreate = req.body;
    const userId: number = req.user.id
	const newContact = await createContactService(contactData, userId);

	return res.status(201).json(newContact);
};

export const ReadContactController = async (req: Request, res: Response): Promise<Response> => {
	const contacts = await readContactsService(req.query);

	return res.status(200).json(contacts);
};

export const RetrieveContactController = async (req: Request, res: Response): Promise<Response> => {
    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin
	const contactId: number = parseInt(req.params.id);
    const foundContact = await retrieveContactsService(thisUserId, thisUserAdmin, contactId);

	return res.status(200).json(foundContact);
};

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {
    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin
	const contactId: number = parseInt(req.params.id);
	const contactData = req.body;
	const updatedContact = await updateContactService(thisUserId, thisUserAdmin, contactId, contactData);

	return res.status(200).json(updatedContact);
};

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {
    const thisUserId: number = req.user.id
    const thisUserAdmin: boolean = req.user.admin
	const contactId: number = parseInt(req.params.id);
	await deleteContactService(thisUserId, thisUserAdmin, contactId);

	return res.status(204).send();
};
