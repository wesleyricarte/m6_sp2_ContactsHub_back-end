import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

const dataSourceConfig = (): DataSourceOptions => {
	const entPath: string = path.join(__dirname, './entities/**.{ts,js}');
	const migPath: string = path.join(__dirname, './migrations/**.{ts,js}');

	const dbUrl: string | undefined = process.env.DATABASE_URL;

	if (!dbUrl) throw new Error('Env var DATABASE_URL does not exists!');

	const nodeEnv: string | undefined = process.env.NODE_ENV;

	if (nodeEnv === 'test') {
		return {
			type: 'sqlite',
			database: ':memory:',
			synchronize: true,
			entities: [entPath],
		};
	}

	return {
		type: 'postgres',
		url: process.env.DATABASE_URL!,
		synchronize: false,
		logging: true,
		migrations: [migPath],
		entities: [entPath],
	};
};

export const AppDataSource = new DataSource(dataSourceConfig());
