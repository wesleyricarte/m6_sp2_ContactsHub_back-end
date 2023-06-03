import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { iUserReturn, iUserUpdate } from '../../interfaces';
import { returnUserSchema } from '../../schemas';

const updadeUserService = async (
	newUserData: iUserUpdate | any,
	userId: number,
	thisUserId: number,
	thisUserAdmin: boolean
): Promise<iUserReturn> => {
	if (!thisUserAdmin) {
		if (thisUserId != userId) throw new AppError('Insufficient permission', 403);
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const oldUserData: User | null = await userRepository.findOneBy({
		id: userId,
	});

	const newUser = await userRepository.create({
		...oldUserData,
		...newUserData,
	});

	await userRepository.save(newUser);

	const updatedUser = returnUserSchema.parse(newUser);

	return updatedUser;
};

export default updadeUserService;
