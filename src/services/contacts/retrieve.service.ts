import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { iContact } from '../../interfaces';
import { contactSchema } from '../../schemas';
import { AppError } from '../../errors';

const retrieveContactsService = async (thisUserId: number, thisUserAdmin: boolean, contactId: number): Promise<iContact> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
    
	const foundContact = await contactRepository.findOne({
        where: { id: contactId },
		relations: ['user'],
	});

    if (!thisUserAdmin) {
        if (thisUserId != foundContact?.user.id) throw new AppError('Insufficient permission', 403);
    }

	const updatedContact: iContact = contactSchema.parse(foundContact);
	return updatedContact;
};

export default retrieveContactsService;
