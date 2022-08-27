import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';
import {celebrate, Joi, Segments} from 'celebrate'

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
  }
}),
projectsController.create);

projectsRouter.get('/', projectsController.list);

export default projectsRouter;
