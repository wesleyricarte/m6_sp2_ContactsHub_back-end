import { Router } from 'express';
import { ReadContactController, RetrieveContactController, createContactController, deleteContactController, updateContactController } from '../controllers';
import { validDataMiddleare, ensureContactExistsMiddleware, duplicatedContactMiddleware, validTokenMiddleare, adminTokenMiddleare } from '../middlewares';
import { contactCreateSchema, contactUpdateSchema } from '../schemas';

const contactsRoutes: Router = Router();

contactsRoutes.post('', validDataMiddleare(contactCreateSchema), duplicatedContactMiddleware, validTokenMiddleare, createContactController);

contactsRoutes.get('', adminTokenMiddleare, ReadContactController);

contactsRoutes.get('/:id', validTokenMiddleare, ensureContactExistsMiddleware, RetrieveContactController);

contactsRoutes.patch('/:id', validTokenMiddleare, validDataMiddleare(contactUpdateSchema), ensureContactExistsMiddleware, duplicatedContactMiddleware, updateContactController);

contactsRoutes.delete('/:id', validTokenMiddleare, ensureContactExistsMiddleware, deleteContactController);

export default contactsRoutes;