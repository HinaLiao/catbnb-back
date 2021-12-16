class PetNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Pet not found';
    this.status = 400;
  }
}

export default PetNotFoundException;
