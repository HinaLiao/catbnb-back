class ReservationNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Reservation not found';
    this.status = 400;
  }
}

export default ReservationNotFoundException;
