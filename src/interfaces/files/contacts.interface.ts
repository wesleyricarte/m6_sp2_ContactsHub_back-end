import { z } from 'zod';
import { DeepPartial, Repository } from 'typeorm';

import { Contact } from '../../entities';
import { contactSchema, arrayContactSchema, readContactsSchmea, contactCreateSchema } from '../../schemas';

export type iContact = z.infer<typeof contactSchema>;
export type iContactCreate = z.infer<typeof contactCreateSchema>;
export type iContactUpdate = DeepPartial<Contact>;
export type iContactRepo = Repository<iContact>;
export type iContactsArray = z.infer<typeof arrayContactSchema>;
export type iContactsArrayResult = z.infer<typeof readContactsSchmea>;
