
class AgendaRepository {
  constructor(Model) {
    this.Model = Model;
  }

  async deleteAllByReservationId(reservationId) {
    await this.Model.deleteMany({ reservation: reservationId });
  }

  async findAllByReservationId(reservationId) {
    const agenda = await this.Model.find({ reservation: reservationId });

    return agenda;
  }

  async create(agendaData) {
    const newAgenda = await this.Model.create(agendaData);

    return newAgenda;
  }

  async findById(id) {
    const agenda = await this.Model.findById(id);

    return agenda;
  }

  async updateAgendaById(id, agendaData) {
    const editedAgenda = await this.Model
      .findByIdAndUpdate(
        id,
        agendaData,
        {
          new: true,
        },
      );

    return editedAgenda;
  }

  async deleteOne(id) {
    await this.Model.findByIdAndDelete(id);
  }
}

export default AgendaRepository;