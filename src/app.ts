import cors from 'cors'
import 'express-async-errors';
import express, { Application, json } from 'express';
import { handleErrors } from './errors';
import {
	loginRoutes,
	contactsRoutes,
	usersRoutes,
} from './routers/';

const app: Application = express();
app.use(json());

app.use(cors())

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/contacts', contactsRoutes);

app.use(handleErrors);

export default app;
