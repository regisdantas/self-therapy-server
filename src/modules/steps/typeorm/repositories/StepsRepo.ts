import Step from '../entities/Step'
import dataSource from '../../../../config/ormconfig'

const StepsRepo = dataSource.getRepository(Step).extend({
  findById: async function (user_id: string, id: string): Promise<Step[]> {
    const step = await this.find({where: {user_id, id}});
    return step;
  },
  findByUserId: async function (user_id: string): Promise<Step[]> {
    const steps = await this.find({where: {user_id}});
    return steps;
  },
  findByProjectId: async function (user_id: string, project_id: string): Promise<Step[]> {
    const steps = await this.find({where: {user_id, project_id}});
    return steps;
  },
  findByParentId: async function (user_id: string, parent_id: string): Promise<Step[]> {
    const steps = await this.find({where: {user_id, parent_id}});
    return steps;
  },
});

export default StepsRepo;
