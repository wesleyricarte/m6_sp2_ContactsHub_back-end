import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { AppError } from '../../errors';

const deleteContactService = async (thisUserId: number, thisUserAdmin: boolean, contactId: number): Promise<void> => {
	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const foundContact = await contactRepository.findOne({ where: { id: contactId }, relations: ['user'] });

	if (!thisUserAdmin) {
		if (thisUserId != foundContact!.user.id) throw new AppError('Insufficient permission', 403);
	}

	await contactRepository.remove(foundContact!);
};

export default deleteContactService;
