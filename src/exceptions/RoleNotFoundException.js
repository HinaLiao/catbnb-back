class RoleNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized role';
    this.status = 401;
  }
}

export default RoleNotFoundException;
