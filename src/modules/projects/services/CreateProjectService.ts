import Project from "../typeorm/entities/Project";
import ProjectsRepo from "../typeorm/repositories/ProjectsRepo";

interface IRequest {
  user_id: string;
  name: string;
}

class CreateProjectService {
  public async execute ({user_id, name}: IRequest): Promise<Project> {
    const project = await ProjectsRepo.create({user_id, name});
    await ProjectsRepo.save(project);
    return project;
  }
}

export default CreateProjectService;
