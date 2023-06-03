import { Repository } from 'typeorm';
import { Contact, User } from '../../entities';
import { iContact, iContactCreate } from '../../interfaces';
import { contactSchema } from '../../schemas';
import { AppDataSource } from '../../data-source';

const createContactService = async (contactData: iContactCreate, userId: number): Promise<iContact> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const foundUser: User | null = await userRepository.findOneBy({ id: userId });

	const contact: Contact = contactRepository.create({
		...contactData,
		user: foundUser!,
	});
	await contactRepository.save(contact);

	const newContact: iContact = contactSchema.parse(contact);
	return newContact;
};

export default createContactService;
