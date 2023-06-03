import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { iContact, iContactUpdate } from '../../interfaces';
import { contactSchema } from '../../schemas';
import { AppError } from '../../errors';

const updateContactService = async (
	thisUserId: number,
	thisUserAdmin: boolean,
	contactId: number,
	contactData: iContactUpdate
): Promise<iContact> => {
    const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
    
	const oldContactData = await contactRepository.findOne({
        where: { id: contactId },
		relations: ['user'],
	});

    if (!thisUserAdmin) {
        if (thisUserId != oldContactData?.user.id) throw new AppError('Insufficient permission', 403);
    }

	const contact = contactRepository.create({
		...oldContactData,
		...contactData,
	});

	await contactRepository.save(contact);

	const updatedContact: iContact = contactSchema.parse(contact);
	return updatedContact;
};

export default updateContactService;
