import { Request, Response } from 'express';
import CreateProjectService from '../services/CreateProjectService';
import ListProjectsService from '../services/ListProjectsService';


class ProjectsController {
  public async list(req: Request, resp: Response): Promise<Response> {
    const listProject = new ListProjectsService();
    const projects = await listProject.execute({user_id: req.user.id});
    return resp.json(projects);
  }
  public async create(req: Request, resp: Response): Promise<Response> {
    const {name} = req.body;
    const createProject = new CreateProjectService();
    const project = await createProject.execute({user_id: req.user.id, name});
    return resp.json(project);
  }
}

export default ProjectsController;
