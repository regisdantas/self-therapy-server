import { Router } from 'express';
import StepsController from '../controllers/StepsController';
import {celebrate, Joi, Segments} from 'celebrate'

const projectsRouter = Router();
const projectsController = new StepsController();

projectsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    project_id: Joi.string().required(),
    parent_id: Joi.string(),
    type: Joi.string().required(),
    content: Joi.string()
  }
}),
projectsController.create);

// projectsRouter.get('/', projectsController.list);

export default projectsRouter;
