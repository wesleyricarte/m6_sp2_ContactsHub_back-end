import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { iUserReturn } from '../../interfaces';
import { returnUserSchema } from '../../schemas';

const retrieveUserService = async (userId: number, thisUserId: number, thisUserAdmin: boolean): Promise<iUserReturn> => {
	if (!thisUserAdmin) {
        if (thisUserId != userId) throw new AppError('Insufficient permission', 403);
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({ id: userId })

	const user = returnUserSchema.parse(userFound);
	return user;
};

export default retrieveUserService;
