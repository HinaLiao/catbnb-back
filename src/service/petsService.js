/* eslint-disable default-param-last */
import validateId from '../validation/mongooseValidation';
import PetNotFoundException from '../exceptions/PetNotFoundException';

class PetsService {
  constructor(petsRepository) {
    this.petsRepository = petsRepository;
  }

  async findAllByTitleAndOwnerId(title = '', id) {
    const pets = await this.petsRepository.findAllByTitleAndOwnerId(title, id);

    return pets;
  }

  async create(body, id) {
    await body.validate();

    const petData = {
      name: body.name,
      gender: body.gender,
      castrated: body.castrated,
      age: body.age,
      vaccinated: body.vaccinated,
      diseases: body.diseases,
      observations: body.observations,
      owner: id,
    };

    const newPet = await this.petsRepository.create(petData);

    return newPet;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    validateId(id);

    const pet = await this.petsRepository.findOneByIdAndOwnerId(id, ownerId);

    return pet;
  }

  async updateOne(id, ownerId, body) {
    await body.validate();
    validateId(id);

    await this.validatePetExists(id, ownerId);

    const petData = {
      name: body.name,
      gender: body.gender,
      castrated: body.castrated,
      age: body.age,
      vaccinated: body.vaccinated,
      diseases: body.diseases,
      observations: body.observations,
    };

    const editedPet = await this.petsRepository.updatePetById(id, petData);

    return editedPet;
  }

  async deleteOne(id, ownerId) {
    validateId(id);

    await this.validatePetExists(id, ownerId);

    await this.petsRepository.deleteOneById(id);
  }

  async validatePetExists(id, ownerId) {
    const pet = await this.petsRepository.findOneByIdAndOwnerId(id, ownerId);

    if (!pet) {
      throw new PetNotFoundException();
    }
  }
}

export default PetsService;
