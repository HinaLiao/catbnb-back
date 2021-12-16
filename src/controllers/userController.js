import { Router } from 'express';

import EditUserProfileRequest from '../dtos/EditUserProfileRequest';

import User from '../models/User';
import UserService from '../service/userService';
import UserRepository from '../repository/userRepository';
import validateRoleMiddleware from '../middlewares/validateRole';

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

const router = Router();

// get user profile
router.get('/meu-perfil', async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await userService.findById(id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// edit user profile
router.put('/meu-perfil', async (req, res, next) => {
  try {
    const { id } = req.user;

    const body = new EditUserProfileRequest(req.body);

    const editedUser = await userService.updateOne(body, id);

    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/meu-perfil-host',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { id } = req.user;

      const body = new EditUserProfileRequest(req.body);

      const editedUser = await userService.updateOne(body, id);

      res.json(editedUser);
    } catch (error) {
      next(error);
    }
  },
);

// delete user profile
router.delete('/meu-perfil', async (req, res, next) => {
  try {
    const { id } = req.user;

    await userService.deleteOne(id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
