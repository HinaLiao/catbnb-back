import { Router } from 'express';

import CreateReservationRequest from '../dtos/CreateReservationRequest';
import EditReservationRequest from '../dtos/EditReservationRequest';

import Reservation from '../models/Reservation';
import Agenda from '../models/Agenda';
import ReservationService from '../service/reservationService';
import ReservationRepository from '../repository/reservationRepository';
import AgendaRepository from '../repository/agendaRepository';
import validateRoleMiddleware from '../middlewares/validateRole';

const reservationRepository = new ReservationRepository(Reservation);
const agendaRepository = new AgendaRepository(Agenda);
const reservationService = new ReservationService(
  reservationRepository,
  agendaRepository,
);

const router = Router();

router.get(
  '/',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { title } = req.query;
      const { id } = req.user;

      const reservation = await reservationService
        .findAllByTitleAndOwnerId(title, id);

      res.json(reservation);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:reservationId',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { reservationId } = req.params;

      const reservation = await reservationService
        .findOneByIdAndOwnerId(
          reservationId,
          id,
        );

      res.json(reservation);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const body = new CreateReservationRequest(req.body);

      const newReservation = await reservationService.create(body, id);

      res.status(201).json(newReservation);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:reservationId',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { reservationId } = req.params;
      const body = new EditReservationRequest(req.body);

      const editedReservation = await reservationService
        .updateOne(
          reservationId,
          id,
          body,
        );

      res.json(editedReservation);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:reservationId',
  validateRoleMiddleware(['Host']),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { reservationId } = req.params;

      await reservationService.deleteOne(reservationId, id);

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
