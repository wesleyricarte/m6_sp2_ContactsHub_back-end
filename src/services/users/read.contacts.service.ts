import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { iUserContactsReturn } from '../../interfaces';
import { returnUserContactsSchema } from '../../schemas';

const readContactsByUserService = async (userId: number, thisUserId: number, thisUserAdmin: boolean): Promise<iUserContactsReturn> => {
	if (!thisUserAdmin) {
        if (thisUserId != userId) throw new AppError('Insufficient permission', 403);
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOne({
        where: { id: userId },
        relations: ['contacts']
    })

	const user = returnUserContactsSchema.parse(userFound);
	return user;

};

export default readContactsByUserService;
