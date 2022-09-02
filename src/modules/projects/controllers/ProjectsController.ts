import { Request, Response } from 'express';
import ListProjectsService from '../services/ListProjectsService';
import CreateProjectService from '../services/CreateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';


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
  public async delete(req: Request, resp: Response): Promise<Response> {
    const {project_id} = req.body;
    const deleteProject = new DeleteProjectService();
    await deleteProject.execute({user_id: req.user.id, project_id});
    return resp.json({message: "Project removed"});
  }

}

export default ProjectsController;
