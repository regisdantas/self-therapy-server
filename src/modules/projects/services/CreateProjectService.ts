import Project from "../typeorm/entities/Project";
import ProjectsRepo from "../typeorm/repositories/ProjectsRepo";
import CreateStepService from '../../steps/services/CreateStepService'

interface IRequest {
  user_id: string;
  name: string;
}

class CreateProjectService {
  public async execute ({user_id, name}: IRequest): Promise<Project> {
    const project = await ProjectsRepo.create({user_id, name});
    await ProjectsRepo.save(project);
    const createSteps = new CreateStepService();
    await createSteps.execute({
      user_id,
      project_id: project.id,
      parent_id: '00000000-0000-0000-0000-000000000000',
      type: 'event',
      content: '',
    });
    await createSteps.execute({
      user_id,
      project_id: project.id,
      parent_id: '00000000-0000-0000-0000-000000000000',
      type: 'coping',
      content: '',
    });
    return project;
  }
}

export default CreateProjectService;
