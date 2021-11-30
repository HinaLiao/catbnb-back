import * as yup from 'yup';

import validateSchema from '../validation/validationSchema';

class CreateReservationRequest {
  constructor({ title, description }) {
    this.title = title;
    this.description = description;

    this.schema = yup.object().shape({
      title: yup
        .string()
        .required('Required field')
        .min(6, 'Minimum of 6 characters')
        .max(30, 'Maximum of 100 characters'),
      description: yup
        .string()
        .max(250, 'Maximum of 250 characters'),
    });
  }

  async validate() {
    await validateSchema(this.schema, {
      title: this.title,
      description: this.description,
    });
  }
}

export default CreateReservationRequest;
