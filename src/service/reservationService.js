import validateId from '../validation/mongooseValidation';
import ReservationNotFoundException from '../exceptions/ReservationNotFoundException';

class ReservationService {
  constructor(reservationRepository, agendaRepository) {
    this.reservationRepository = reservationRepository;
    this.agendaRepository = agendaRepository;
  }

  async findAllByTitleAndOwnerId(id, title = '') {
    const reservations = await this.reservationRepository
      .findAllByTitleAndOwnerId(
        title,
        id,
      );

    return reservations;
  }

  async create(body, id) {
    await body.validate();

    const reservationData = {
      title: body.title,
      description: body.description,
      owner: id,
    };

    const newReservation = await this.reservationRepository.create(reservationData);

    return newReservation;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    validateId(id);

    const reservation = await this.reservationRepository
      .findOneByIdAndOwnerId(
        id,
        ownerId,
      );

    return reservation;
  }

  async updateOne(id, ownerId, body) {
    await body.validate();
    validateId(id);

    await this.validateReservationExists(id, ownerId);

    const reservationData = {
      title: body.title,
      description: body.description,
    };

    const editedReservation = await this.reservationRepository
      .updateReservationById(
        id,
        reservationData,
      );

    return editedReservation;
  }

  async deleteOne(id, ownerId) {
    validateId(id);

    await this.validateReservationExists(id, ownerId);

    await this.reservationRepository.deleteOneById(id);

    await this.agendaRepository.deleteAllByReservationId(id);
  }

  async validateReservationExists(id, ownerId) {
    const reservation = await this.reservationRepository
      .findOneByIdAndOwnerId(
        id,
        ownerId,
      );

    if (!reservation) {
      throw new ReservationNotFoundException();
    }
  }
}

export default ReservationService;
