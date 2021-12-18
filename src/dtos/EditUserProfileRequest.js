import * as yup from 'yup';

import validateSchema from '../validation/validationSchema';

class EditUserProfileRequest {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;

    this.schema = yup.object().shape({
      name: yup
        .string()
        .required('Required field')
        .min(3, 'Minimum of 3 characters')
        .max(100, 'Maximum of 100 characters'),
      email: yup
        .string()
        .required('Required field')
        .email('Field must have an email format'),
    });
  }

  async validate() {
    await validateSchema(this.schema, {
      name: this.name,
      email: this.email,
    });
  }
}

export default EditUserProfileRequest;
