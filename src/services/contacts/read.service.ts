import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { iContactsArray, iContactsArrayResult } from '../../interfaces';
import { readContactsSchmea } from '../../schemas';

const readContactsService = async ( reqQuery: any): Promise<iContactsArrayResult> => {
	let { page, perPage, sort, order } = reqQuery;
	let baseUrl = 'http://localhost:3000/contacts';

    page = parseInt(page) > 0 ? parseInt(page) : 1
    perPage = parseInt(perPage) > 0 && parseInt(perPage) <= 5 ? parseInt(perPage) : 5
	order = ['ASC', 'DESC', 'asc', 'desc'].includes(order) && sort ? order : 'ASC';
	sort = ['email'].includes(sort) ? sort : 'id';

	const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

	const getContacts: iContactsArray = await contactRepository.find({
        skip: perPage * (page - 1), take: perPage, order: { [sort]: order }, relations: ['user'],
	});

	let count = await contactRepository.count();
	let prevPage: string | null = page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
	let nextPage: string | null = count > perPage * page ? `${baseUrl}?page=${page + 1}&perPage=${perPage}` : null;

	const contactsResult: iContactsArrayResult = {
		prevPage: prevPage,
		nextPage: nextPage,
		count: count,
		data: getContacts,
	};

	const parsedContacts: iContactsArrayResult = readContactsSchmea.parse(contactsResult);
	return parsedContacts;
};

export default readContactsService;
