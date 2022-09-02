import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';
import {celebrate, Joi, Segments} from 'celebrate'

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get('/', projectsController.list);

projectsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
  }
}),
projectsController.create);

projectsRouter.delete('/',
celebrate({
  [Segments.BODY]: {
    project_id: Joi.string().uuid().required()
  }
}),
projectsController.delete);


export default projectsRouter;
