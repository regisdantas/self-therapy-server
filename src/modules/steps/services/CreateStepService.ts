import AppError from '../../../shared/errors/AppError'
import Step from '../typeorm/entities/Step';
import StepsRepo from '../typeorm/repositories/StepsRepo';
import UsersRepo from '../../../modules/users/typeorm/repositories/UsersRepo';
import ProjectsRepo from "../../../modules/projects/typeorm/repositories/ProjectsRepo";

interface IRequest {
  user_id: string;
  project_id: string;
  parent_id: string;
  type: string;
  content: string;
}

class CreateStepService {
  public async execute({
    user_id,
    project_id,
    parent_id,
    type,
    content,
  }: IRequest): Promise<Step> {
    const userExist = UsersRepo.findById(user_id);
    if (!userExist) {
      throw new AppError('User does not exist.');
    }
    const projectExist = ProjectsRepo.findById(project_id);
    if (!projectExist) {
      throw new AppError('Project does not exist.');
    }
    if (parent_id !== null) {
      const parentExist = StepsRepo.findById(parent_id);
      if (!parentExist) {
        throw new AppError('Parent does not exist.');
      }
    }
    const step = await StepsRepo.create({
      user_id,
      project_id,
      parent_id,
      type,
      content,
    });
    await StepsRepo.save(step);
    return step;
  }
}

export default CreateStepService;
