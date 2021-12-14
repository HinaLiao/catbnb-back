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
    role: { type: String, enum: ['Host', 'Costumer'] },
    active: { type: Boolean, default: true },
    weekDays: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6] },
  },
  {
    timestamps: true,
  },
);

const User = model('user', userSchema);

export default User;
