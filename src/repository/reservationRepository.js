class ReservationRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async findAllByTitleAndOwnerId(title, id) {
    const titleRegex = new RegExp(title, 'i');

    const reservations = await this.Model.find({
      owner: id,
      title: { $regex: titleRegex },
    });

    return reservations;
  }

  async create(reservationData) {
    const newReservation = await this.Model.create(reservationData);

    return newReservation;
  }

  async findOneByIdAndOwnerId(id, ownerId) {
    const reservation = await this.Model.findOne({
      _id: id,
      owner: ownerId,
    });

    return reservation;
  }

  async updateReservationById(id, reservationData) {
    const editedReservation = await this.Model.findByIdAndUpdate(
      id,
      reservationData,
      {
        new: true,
      },
    );

    return editedReservation;
  }

  async deleteOneById(id) {
    await this.Model.findByIdAndDelete(id);
  }
}

export default ReservationRepository;
