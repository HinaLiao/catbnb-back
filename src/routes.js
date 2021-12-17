import { Router } from 'express';

import authController from './controllers/authController';
import reservationController from './controllers/reservationController';
import agendaController from './controllers/agendaController';
import userController from './controllers/userController';
import petsController from './controllers/petsController';

import protectedRouteMiddleware from './middlewares/protectedRoute';

const router = Router();

router.use('/auth', authController);

router.use(protectedRouteMiddleware);

router.use('/reservation', reservationController);
router.use('/agenda', agendaController);
router.use('/meu-perfil', userController);
router.use('/pets', petsController);

export default router;
