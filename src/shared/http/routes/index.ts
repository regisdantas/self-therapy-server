import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes'
import sessionsRouter from '@modules/users/routes/sessions.routes'

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);


export default routes;
