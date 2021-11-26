import { Schema, model } from 'mongoose';

const petsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Macho', 'Fêmea'],
    },
    castrated: {
      type: Boolean,
      required: true,
    },
    age: {
      type: String,
      required: true,
      enum: ['Filhote', 'Adulto', 'Idoso'],
    },
    vaccinated: {
      type: Boolean,
      required: true,
    },
    diseases: {
      type: String,
      required: true,
      enum: ['FIV+', 'FELV+', 'no'],
      default: 'no',
    },
    observations: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 150,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    timestamps: true,
  },
);

const Pets = model('pets', petsSchema);

export default Pets;
