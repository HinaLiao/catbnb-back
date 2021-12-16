import { Router } from 'express';

import RegisterRequest from '../dtos/RegisterRequest';
import LoginRequest from '../dtos/LoginRequest';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const body = new RegisterRequest(req.body);

    const userResponse = await authService.register(body);

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const body = new LoginRequest(req.body);

    const loginResponse = await authService.login(body);

    res.status(200).json(loginResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.logout();
    res.status(200)
      .json({ message: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
});

export default router;
