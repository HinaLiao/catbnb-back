import validateId from '../validation/mongooseValidation';
import UserNotFoundException from '../exceptions/UserNotFoundException';

class UserService {
  constructor(userRepository, userService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async findOneById(id) {
    validateId(id);

    const user = await this.userRepository.findById(id);

    return user;
  }

  async updateOne(body, ownerId) {
    await body.validate();

    const userData = {
      name: body.name,
      email: body.email,
    };

    console.log(userData);
    console.log(ownerId);
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
