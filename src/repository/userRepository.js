class UserRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findById(id) {
    const user = await this.Model.findById(id);

    return user;
  }

  async updateUserById(userData, id) {
    const editedUser = await this.Model
      .findByIdAndUpdate(id, userData, {
        new: true,
      });

    return editedUser;
  }

  async findByIdAndDelete(id) {
    await this.Model.findByIdAndDelete(id);
  }
}

export default UserRepository;
