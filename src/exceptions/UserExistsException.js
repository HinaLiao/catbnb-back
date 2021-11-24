class UserExistsException extends Error {
  constructor() {
    super();
    this.message = 'Email is already being used. Please type another one';
    this.status = 400;
  }
}

export default UserExistsException;
