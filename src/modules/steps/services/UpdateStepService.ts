import AppError from '../../../shared/errors/AppError'
import Step from '../typeorm/entities/Step';
import StepsRepo from '../typeorm/repositories/StepsRepo';
import UsersRepo from '../../users/typeorm/repositories/UsersRepo';
import ProjectsRepo from "../../projects/typeorm/repositories/ProjectsRepo";

interface IRequest {
  user_id: string;
  step_id: string;
  content: string;
}

class UpdateStepService {
  public async execute({
    user_id,
    step_id,
    content,
  }: IRequest): Promise<Step> {
    const userExist = UsersRepo.findById(user_id);
    if (!userExist) {
      throw new AppError('User does not exist.');
    }
    const step = await StepsRepo.findById(user_id, step_id);
    if (!step) {
      throw new AppError('Card not found.');
    }
    step.content = content;
    await StepsRepo.save(step);
    return step;
  }
}

export default UpdateStepService;
