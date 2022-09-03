import Project from '../entities/Project'
import dataSource from '../../../../config/ormconfig'

const ProjectsRepo = dataSource.getRepository(Project).extend({
  findById: async function (user_id: string, id: string): Promise<Project|null> {
    const project = await this.findOne({where: {user_id, id}});
    return project;
  },
  findByUserId: async function (user_id: string): Promise<Project[]> {
    const projects = await this.find({where: {user_id}});
    return projects;
  },
});

export default ProjectsRepo;
