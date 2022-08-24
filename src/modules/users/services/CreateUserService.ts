import User from '../typeorm/entities/User';
import UsersRepo from '../typeorm/repositories/UsersRepo';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password
  }: IRequest): Promise<User> {
    const emailExist = await UsersRepo.findByEmail(email);
    if (emailExist) {
      throw new AppError('Email address already in use.');
    }
    const user = await UsersRepo.create({name, email, password});
    await UsersRepo.save(user);
    return user;
  }
}

export default CreateUserService;
