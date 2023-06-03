import { iLoginRequest } from '../../interfaces';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginService = async (loginData: iLoginRequest): Promise<string> => {
	const { email, password } = loginData;
	const userRepository: Repository<User> = AppDataSource.getRepository(User);

	const foundUser: User | null = await userRepository.findOneBy({ email: email });
	if (!foundUser) throw new AppError('Invalid credentials', 401);

	const matchPassword: boolean = await compare(password, foundUser!.password);
	if (!matchPassword) throw new AppError('Invalid credentials', 401);

	const token: string = jwt.sign(
		{
			admin: foundUser!.admin,
			deletedAt: foundUser!.deletedAt,
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: '24h',
			subject: foundUser!.id.toString(),
		}
	);

	return token;
};

export default loginService;
