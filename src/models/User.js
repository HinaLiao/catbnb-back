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
    role: { type: String, enum: ['Host', 'Costumer'], default: 'Costumer' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const User = model('user', userSchema);

export default User;
