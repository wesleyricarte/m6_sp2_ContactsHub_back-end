import { Router } from 'express';
import { createUsersController, deleteUsersController, readContactsByUserController, readUsersController, retrieveUsersController, updateUsersController } from '../controllers';
import { adminTokenMiddleare, duplicatedUserMiddleare, validDataMiddleare, validTokenMiddleare, validUserMiddleare } from '../middlewares';
import { createUserSchema, updateUserSchema } from '../schemas';

const usersRoutes: Router = Router();

usersRoutes.post('', validDataMiddleare(createUserSchema), duplicatedUserMiddleare, createUsersController);

usersRoutes.get('', adminTokenMiddleare, readUsersController);

usersRoutes.get('/:id', validTokenMiddleare, validUserMiddleare, retrieveUsersController);

usersRoutes.get('/:id/contacts', validTokenMiddleare, validUserMiddleare, readContactsByUserController);

usersRoutes.patch('/:id', validDataMiddleare(updateUserSchema), duplicatedUserMiddleare, validTokenMiddleare, validUserMiddleare, updateUsersController);

usersRoutes.delete('/:id', validUserMiddleare, adminTokenMiddleare, deleteUsersController);

export default usersRoutes;
