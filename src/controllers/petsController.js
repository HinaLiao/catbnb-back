import { Router } from 'express';

import Pets from '../models/Pets';

import CreatePetRequest from '../dtos/CreatePetRequest';
import EditPetRequest from '../dtos/EditPetRequest';

import PetsService from '../service/petsService';
import PetsRepository from '../repository/petsRepository';

const petsRepository = new PetsRepository(Pets);
const petsService = new PetsService(petsRepository);

const router = Router();

router.get('/pets', async (req, res, next) => {
  try {
    const { name } = req.query;
    const { id } = req.user;

    const pets = await petsService.findAllByTitleAndOwnerId(name, id);

    res.json(pets);
  } catch (error) {
    next(error);
  }
});

router.get('/pets/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;

    const pet = await Pets.findOneByIdAndOwnerId({
      _id: petId,
      owner: id,
    });

    res.json(pet);
  } catch (error) {
    next(error);
  }
});

router.post('/pets/registerNewPet', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { body } = new CreatePetRequest(req.body);

    const newPet = await Pets.create(body, id);

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
});

router.put('/pets/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;
    const { body } = EditPetRequest(req.body);

    const editedPet = await Pets.findByIdAndUpdate(petId, id, body, {
      new: true,
    });

    res.json(editedPet);
  } catch (error) {
    next(error);
  }
});

router.delete('/pets/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;

    await Pets.findByIdAndDelete(petId, id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
