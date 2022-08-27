import Step from '../entities/Step'
import dataSource from '@config/ormconfig'

const StepsRepo = dataSource.getRepository(Step).extend({
  findById: async function (id: string): Promise<Step|null> {
    const step = await this.findOne({where: {id}});
    return step;
  },
  findByUserId: async function (user_id: string): Promise<Step[]> {
    const steps = await this.find({where: {user_id}});
    return steps;
  },
  findByProjectId: async function (project_id: string): Promise<Step[]> {
    const steps = await this.find({where: {project_id}});
    return steps;
  },
  findByParentId: async function (parent_id: string): Promise<Step[]> {
    const steps = await this.find({where: {parent_id}});
    return steps;
  },
});

export default StepsRepo;
