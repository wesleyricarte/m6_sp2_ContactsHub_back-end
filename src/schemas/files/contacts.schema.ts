import { z } from 'zod';
import { returnUserContactSchema } from '../../schemas';

export const contactSchema = z.object({
	id: z.number(),
	name: z.string().min(3).max(50),
	email: z.string().email().max(45),
	phone: z.string().min(11).max(11),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullish(),
	user: returnUserContactSchema,
});

export const contactsArrayWithoutUserSchema = z
	.object({
		id: z.number(),
		name: z.string().min(3).max(50),
		email: z.string().email().max(45),
		phone: z.string().min(11).max(11),
		createdAt: z.string(),
		updatedAt: z.string(),
		deletedAt: z.string().nullish(),
	})
	.array();

export const contactCreateSchema = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email().max(45),
	phone: z.string().min(11).max(11),
});

export const contactUpdateSchema = contactCreateSchema.partial();

export const arrayContactSchema = contactSchema.array();

export const readContactsSchmea = z.object({
	prevPage: z.string().nullable(),
	nextPage: z.string().nullable(),
	count: z.number(),
	data: arrayContactSchema,
});
