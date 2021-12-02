import { Router } from 'express';

import CreateAgendaRequest from '../dtos/CreateAgendaRequest';
import EditAgendaRequest from '../dtos/EditAgendaRequest';

import Agenda from '../models/Agenda';
import Reservation from '../models/Reservation';
import AgendaService from '../service/agendaService';
import ReservationService from '../service/reservationService';
import AgendaRepository from '../repository/agendaRepository';
import ReservationRepository from '../repository/reservationRepository';

const agendaRepository = new AgendaRepository(Agenda);
const reservationRepository = new ReservationRepository(Reservation);
const reservationService = new ReservationService(
  reservationRepository,
  agendaRepository,
);
const agendaService = new AgendaService(agendaRepository, reservationService);

const router = Router();

router.get('/:reservationId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { reservationId } = req.params;

    const agenda = await agendaService
      .findAllByReservationId(
        reservationId,
        id,
      );

    res.json(agenda);
  } catch (error) {
    next(error);
  }
});

router.post('/:reservationId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { reservationId } = req.params;
    const body = new CreateAgendaRequest(req.body);

    const newTask = await agendaService.create(reservationId, id, body);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:taskId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;
    const body = new EditAgendaRequest(req.body);

    const editedTask = await agendaService.updateOne(taskId, id, body);

    res.status(200).json(editedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:taskId', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;

    await agendaService.deleteOne(taskId, id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export default router;
















