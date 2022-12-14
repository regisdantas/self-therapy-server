import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const {email, password} = req.body;
    const CreateSession = new CreateSessionService();
    const result = await CreateSession.execute({email, password});
    return resp.json(result);
  }
}

export default SessionsController;
