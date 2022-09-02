import Project from "../typeorm/entities/Project";
import ProjectsRepo from "../typeorm/repositories/ProjectsRepo";
import AppError from '@shared/errors/AppError';

interface IRequest {
  project_id: string;
  user_id: string;
}

class DeleteProjectService {
  public async execute ({project_id, user_id}: IRequest): Promise<void> {
    const projects = await ProjectsRepo.find({where: {id: project_id, user_id: user_id}});
    if (!projects || projects.lenght === 0) {
      throw new AppError('Project not found.');
    }
    projects.map((project: Project) => ProjectsRepo.remove(project));
  }
}

export default DeleteProjectService;
