import { Router } from 'express';

import authController from './controllers/authController';
import reservationController from './controllers/reservationController';
import agendaController from './controllers/agendaController';

const router = Router();

router.use('/auth', authController);
router.use('/results', reservationController);
router.use('/checkout', agendaController);

export default router;
