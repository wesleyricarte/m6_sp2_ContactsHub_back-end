import { Router } from 'express';
import { loginController } from '../controllers';
import { validDataMiddleare } from '../middlewares';
import { defaultLoginSchema } from '../schemas';

const loginRoutes: Router = Router();

loginRoutes.post('', validDataMiddleare(defaultLoginSchema), loginController);

export default loginRoutes;
