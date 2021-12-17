class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findUserByEmail(email) {
    const foundUser = await this.Model.findOne({ email });

    return foundUser;
  }

  async saveNewUser(newUser) {
    const savedUser = await this.Model.create(newUser);

    return savedUser;
  }

  async findUsersByWeekDays(day) {
    const availableUsers = await this.Model.find({ unavailableWeekDays: { $ne: day } });

    return availableUsers;
  }
}

export default AuthRepository;
