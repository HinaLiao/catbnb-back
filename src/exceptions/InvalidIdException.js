class InvalidIdException extends Error {
  constructor() {
    super();
    this.message = 'Invalid ID Informed';
    this.status = 400;
  }
}

export default InvalidIdException;
