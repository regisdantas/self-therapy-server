import Project from "../typeorm/entities/Project";
import ProjectsRepo from "../typeorm/repositories/ProjectsRepo";

interface IRequest {
  user_id: string;
}

class ListProjectsService {
  public async execute ({user_id}: IRequest): Promise<Project[]> {
    const projectList = await ProjectsRepo.findByUserId(user_id);
    return projectList;
  }
}

export default ListProjectsService;
