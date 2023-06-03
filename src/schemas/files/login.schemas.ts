import { z } from 'zod';

export const defaultLoginSchema = z.object({
	email: z.string().email().max(45),
	password: z.string().max(120),
});

export const returnLoginSchema = z.object({
	token: z.string(),
});
