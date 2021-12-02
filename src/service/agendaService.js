import validateId from '../validation/mongooseValidation';
import AgendaNotFoundException from '../exceptions/AgendaNotFoundException';

class AgendaService {
  constructor(agendaRepository, reservationService) {
    this.agendaRepository = agendaRepository;
    this.reservationService = reservationService;
  }

  async findAllByReservationId(reservationId, ownerId) {
    validateId(reservationId);

    await this.reservationService
      .validateReservationExists(reservationId, ownerId);

    const agenda = await this.agendaRepository
      .findAllByReservationId(reservationId);

    return agenda;
  }

  async create(reservationId, ownerId, body) {
    await body.validate();
    validateId(reservationId);

    await this.reservationService
      .validateReservationExists(reservationId, ownerId);

    const agendaData = {
      title: body.title,
      description: body.description,
      reservation: reservationId,
    };

    const newAgenda = await this.agendaRepository.create(agendaData);

    await this.reservationService
      .insertAgendaIdIntoReservation(
        reservationId,
        newAgenda._id,
      );

    return newAgenda;
  }

  async updateOne(agendaId, ownerId, body) {
    await body.validate();
    validateId(agendaId);

    await this.findAgendaAndValidateReservationOwner(
      agendaId,
      ownerId,
    );

    const agendaData = {
      title: body.title,
      description: body.description,
    };

    const editedAgenda = await this.agendaRepository
      .updateagendaById(
        agendaId,
        agendaData,
      );

    return editedAgenda;
  }

  async deleteOne(agendaId, ownerId) {
    validateId(agendaId);

    const agenda = await this.findAgendaAndValidateReservationOwner(
      agendaId,
      ownerId,
    );

    await this.agendaRepository.deleteOne(agendaId);

    await this.reservationService
      .removeAgendaIdFromReservation(
        agenda.reservation,
        agendaId,
      );
  }

  async findAgendaAndValidateReservationOwner(agendaId, ownerId) {
    const agenda = await this.agendaRepository.findById(agendaId);

    if (!agenda) {
      throw new AgendaNotFoundException();
    }

    await this.reservationService
      .validateReservationExists(
        agenda.reservation,
        ownerId,
      );

    return agenda;
  }
}

export default AgendaService;