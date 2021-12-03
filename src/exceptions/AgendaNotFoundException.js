class AgendaNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Agenda not found';
    this.status = 400;
  }
}

export default AgendaNotFoundException;
