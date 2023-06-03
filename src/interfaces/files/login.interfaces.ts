import { z } from 'zod';
import { defaultLoginSchema, returnLoginSchema } from '../../schemas';

export type iLoginRequest = z.infer<typeof defaultLoginSchema>;
export type iLoginResponse = z.infer<typeof returnLoginSchema>;
