import UserModel from '../../database/models/UserModel';

const userService = {
  async find(email: string) {
    const user = await UserModel.findOne({
      where: { email },
    });
    return user;
  },

  async login(email: string, password: string) {
    const user = await UserModel.findOne({
      where: { email, password },
    });
    return user;
  },
};

export default userService;
