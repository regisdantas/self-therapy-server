import AppError from '../../../shared/errors/AppError'
import Step from '../typeorm/entities/Step';
import StepsRepo from '../typeorm/repositories/StepsRepo';
import UsersRepo from '../../../modules/users/typeorm/repositories/UsersRepo';
import ProjectsRepo from "../../../modules/projects/typeorm/repositories/ProjectsRepo";

interface IRequest {
  user_id: string;
  project_id: string;
}

class ListStepsService {
  public async execute({
    user_id,
    project_id
  }: IRequest): Promise<Step[]> {
    const userExist = UsersRepo.findById(user_id);
    if (!userExist) {
      throw new AppError('User does not exist.');
    }
    const projectExist = ProjectsRepo.findById(project_id);
    if (!projectExist) {
      throw new AppError('Project does not exist.');
    }
    const stepList = await StepsRepo.findByProjectId(project_id);
    return stepList;
  }
}

export default ListStepsService;
