import * as yup from 'yup';

import validateSchema from '../validation/validationSchema';

class EditPetRequest {
  constructor({
    name,
    gender,
    castrated,
    age,
    vaccinated,
    diseases,
    observations,
  }) {
    this.name = name;
    this.gender = gender;
    this.castrated = castrated;
    this.age = age;
    this.vaccinated = vaccinated;
    this.diseases = diseases;
    this.observations = observations;

    this.schema = yup.object().shape({
      name: yup
        .string()
        .required('Required field')
        .min(3, 'Minimum of 3 characters')
        .max(50, 'Maximum of 50 characters'),
      gender: yup
        .string()
        .required('Required field')
        .oneOf(['Macho', 'Femea'], 'Selecting the gender field is required'),
      castrated: yup.boolean().required('Required field'),
      age: yup
        .string()
        .required('Required field')
        .oneOf(['Filhote', 'Adulto', 'Idoso']),
      vaccinated: yup.boolean().required('Required field'),
      diseases: yup
        .string()
        .required('Required field')
        .oneOf(['FIV+', 'FELV+', 'no']),
      observations: yup.string().max(150, 'Maximum of 150 characters'),
    });
  }

  async validate() {
    await validateSchema(this.schema, {
      name: this.name,
      gender: this.gender,
      castrated: this.castrated,
      age: this.age,
      vaccinated: this.vaccinated,
      diseases: this.diseases,
      observations: this.observations,
    });
  }
}

export default EditPetRequest;
