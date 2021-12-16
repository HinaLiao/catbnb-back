import * as yup from 'yup';

import validateSchema from '../validation/validationSchema';

class EditUserProfileRequest {
  constructor({ name }) {
    this.name = name;

    this.schema = yup.object().shape({
      name: yup
        .string()
        .required('Required field')
        .min(3, 'Minimum of 3 characters')
        .max(100, 'Maximum of 100 characters'),
    });
  }

  async validate() {
    await validateSchema(this.schema, {
      name: this.name,
    });
  }
}

export default EditUserProfileRequest;
