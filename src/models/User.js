import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Host', 'Customer'], default: 'Customer' },
    unavailableWeekDays: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6] },
    about: { type: String, minleght: 50, maxlength: 350 },
    skills: [{
      type: String,
      enum: [
        'Primeiros socorros veterinário',
        'Aplica medicação oral',
        'Aplica injetáveis',
        'Aceita gatos idosos',
        'Tem experiência com idosos',
        'Supervisão 24h',
        'Transporte de emergência',
      ],
      required: false,
    }],
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const User = model('user', userSchema);

export default User;
