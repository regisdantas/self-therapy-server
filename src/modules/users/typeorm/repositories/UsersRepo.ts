import User from '../entities/User';
import { dataSource } from '@config/ormconfig';

const UsersRepo = dataSource.getRepository(User).extend({
  findByName: async function (name: string): Promise<User|null> {
    const user = await this.findOne({where: {name}});
    return user;
  },

  findById: async function (id: string): Promise<User|null> {
    const user = await this.findOne({where: {id}});
    return user;
  },

  findByEmail: async function (email: string): Promise<User|null> {
    const user = await this.findOne({where: {email}});
    return user;
  },
});

export default UsersRepo;
