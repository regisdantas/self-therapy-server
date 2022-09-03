import AppError from '../../../shared/errors/AppError'
import Step from '../typeorm/entities/Step';
import StepsRepo from '../typeorm/repositories/StepsRepo';
import UsersRepo from '../../../modules/users/typeorm/repositories/UsersRepo';

interface IRequest {
  user_id: string;
  step_id: string;
}

class DeleteStepService {
  public async execute({
    user_id,
    step_id
  }: IRequest): Promise<void> {
    const userExist = UsersRepo.findById(user_id);
    if (!userExist) {
      throw new AppError('User does not exist.');
    }
    const steps = await StepsRepo.findById(user_id, step_id);
    if (!steps || steps.length === 0) {
      throw new AppError('Card not found.');
    }
    steps.map((step: Step) => step.parent_id !== '00000000-0000-0000-0000-000000000000' && StepsRepo.remove(step));
  }
}

export default DeleteStepService;
