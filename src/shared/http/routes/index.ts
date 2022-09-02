import { Router } from 'express';
import usersRouter from '../../../modules/users/routes/users.routes'
import sessionsRouter from '../../../modules/users/routes/sessions.routes'
import projectsRouter from '../../../modules/projects/routes/projects.routes'
import stepsRouter from '../../../modules/steps/routes/steps.routes'
import isAuthenticated from '../middlewares/isAuthenticated';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users/projects', isAuthenticated, projectsRouter);
routes.use('/users/projects/steps', isAuthenticated, stepsRouter);


export default routes;
