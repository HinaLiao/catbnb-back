import { Router } from 'express';

import Pets from '../models/Pets';

import CreatePetRequest from '../dtos/CreatePetRequest';
import EditPetRequest from '../dtos/EditPetRequest';

import PetsService from '../service/petsService';
import PetsRepository from '../repository/petsRepository';

const petsRepository = new PetsRepository(Pets);
const petsService = new PetsService(petsRepository);

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    const { id } = req.user;

    const pets = await petsService.findAllByNameAndOwnerId(name, id);

    res.json(pets);
  } catch (error) {
    next(error);
  }
});

router.get('/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;

    const pet = await petsService.findOneByIdAndOwnerId(petId, id);

    res.json(pet);
  } catch (error) {
    next(error);
  }
});

router.post('/registerNewPet', async (req, res, next) => {
  try {
    const body = new CreatePetRequest(req.body);
    const { id } = req.user;

    const newPet = await petsService.create(body, id);

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
});

router.put('/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;
    const body = new EditPetRequest(req.body);

    const editedPet = await petsService.findByIdAndUpdate(petId, id, body, {
      new: true,
    });

    res.json(editedPet);
  } catch (error) {
    next(error);
  }
});

router.delete('/:petId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { petId } = req.params;

    await petsService.findByIdAndDelete(petId, id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
