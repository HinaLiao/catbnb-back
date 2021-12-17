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
      enum: ['Macho', 'Femea'],
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
    diseases: [{
      type: String,
      default: [],
    }],
    observations: {
      type: String,
      required: false,
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
