import { Request, Response } from 'express';
import CreateStepService from '../services/CreateStepService';
// import ListStepssService from '../services/ListStepsService';

class StepsController {
  // public async list(req: Request, resp: Response): Promise<Response> {
  //   const listSteps = new ListStepssService();
  //   const projects = await listSteps.execute({user_id: req.user.id});
  //   return resp.json(projects);
  // }
  public async create(req: Request, resp: Response): Promise<Response> {
    const { project_id, parent_id, type, content } = req.body;
    const createSteps = new CreateStepService();
    const step = await createSteps.execute({
      user_id: req.user.id,
      project_id,
      parent_id,
      type,
      content,
    });
    return resp.json(step);
  }
}

export default StepsController;
