import { Router } from 'express';

import authController from './controllers/authController';
import reservationController from './controllers/reservationController';
import agendaController from './controllers/agendaController';

import protectedRouteMiddleware from './middlewares/protectedRoute';

const router = Router();

router.use('/auth', authController);

router.use(protectedRouteMiddleware);

router.use('/reservation', reservationController);
router.use('/agenda', agendaController);

export default router;
