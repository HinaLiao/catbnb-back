class PetsRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findAllByNameAndOwnerId(name, id) {
    const nameRegex = new RegExp(name, 'i');

    const pets = await this.Model.find({
      owner: id,
      name: { $regex: nameRegex },
    });

    return pets;
  }

  async create(petData) {
    const newPet = await this.Model.create(petData);

    return newPet;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    const pet = await this.Model.findOne({
      _id: id,
      owner: ownerId,
    });

    return pet;
  }

  async updatePetById(id, petData) {
    const editedPet = await this.Model.findByIdAndUpdate(id, petData, {
      new: true,
    });

    return editedPet;
  }

  async deleteOneById(id) {
    await this.Model.findByIdAndDelete(id);
  }
}

export default PetsRepository;
