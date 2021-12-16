class UserNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'User not found';
    this.status = 400;
  }
}

export default UserNotFoundException;
