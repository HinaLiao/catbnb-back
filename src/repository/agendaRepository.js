class AgendaRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async deleteAllByReservationId(reservationId) {
    await this.Model.deleteMany({ reservation: reservationId });
  }
}

export default AgendaRepository;
