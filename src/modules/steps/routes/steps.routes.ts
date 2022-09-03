import { Router } from 'express';
import StepsController from '../controllers/StepsController';
import {celebrate, Joi, Segments} from 'celebrate'

const stepsRouter = Router();
const stepsController = new StepsController();

stepsRouter.post('/',
celebrate({
  [Segments.BODY]: {
    project_id: Joi.string().uuid().required(),
    parent_id: Joi.string().uuid().required(),
    type: Joi.string().required(),
    content: Joi.string()
  }
}),
stepsController.create);

stepsRouter.get('/',
celebrate({ [Segments.QUERY]: { project_id: Joi.string().uuid().required() } }),
stepsController.list);

stepsRouter.delete('/',
celebrate({ [Segments.BODY]: { step_id: Joi.string().uuid().required() } }),
stepsController.delete);

export default stepsRouter;
