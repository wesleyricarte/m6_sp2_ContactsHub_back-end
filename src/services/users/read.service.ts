import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { iUserReturnArray } from '../../interfaces';
import { returnArrayUserSchema } from '../../schemas';

const readUsersService = async (): Promise<iUserReturnArray> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
	const getUsers: Array<User> = await userRepository.find({
        relations: ['contacts'],
    });

	const users: iUserReturnArray = returnArrayUserSchema.parse(getUsers);
	return users;
};

export default readUsersService