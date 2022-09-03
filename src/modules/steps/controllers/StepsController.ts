import { Request, Response } from 'express';
import CreateStepService from '../services/CreateStepService';
import ListStepsService from '../services/ListStepsService';
import DeleteStepService from '../services/DeleteStepService'

class StepsController {
  public async list(req: Request, resp: Response): Promise<Response> {
    const {project_id} = req.query;
    const listSteps = new ListStepsService();
    const steps = await listSteps.execute({user_id: req.user.id, project_id: project_id as string});
    return resp.json(steps);
  }

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

  public async delete(req: Request, resp: Response): Promise<Response> {
    const {step_id} = req.body;
    const deleteSteps = new DeleteStepService();
    await deleteSteps.execute({user_id: req.user.id, step_id: step_id as string});
    return resp.json({message: "Step removed"});
  }
}

export default StepsController;
