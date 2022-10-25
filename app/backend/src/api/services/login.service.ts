import UserModel from '../../database/models/UserModel';

const userService = {
  async find(email: string) {
    const user = await UserModel.findOne({
      where: { email },
    });
    return user;
  },
};

export default userService;
