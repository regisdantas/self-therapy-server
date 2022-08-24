import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const {name, email, password} = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({name, email, password});
    return resp.json(user);
  }
}

export default UsersController;
