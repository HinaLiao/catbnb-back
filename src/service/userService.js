import UserNotFoundException from '../exceptions/UserNotFoundException';

class UserService {
  constructor(userRepository, userService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async updateOne(body, ownerId) {
    await body.validate();

    const userData = {
      name: body.name,
    };

    const editedUser = await this.userRepository.updateUserById(
      userData,
      ownerId,
    );

    return editedUser;
  }

  async deleteOne(ownerId) {
    await this.validateUserExists(ownerId);

    await this.userRepository.findByIdAndDelete(ownerId);
  }

  async validateUserExists(ownerId) {
    const user = await this.userRepository.findById(ownerId);

    if (!user) {
      throw new UserNotFoundException();
    }
  }
}

export default UserService;
