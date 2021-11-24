import { Schema, model } from 'mongoose';

const catSittingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
    },
    description: { type: String, maxlength: 50 },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'task', default: [] }],
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    timestamps: true,
  },
);

const Reservation = model('ways', catSittingSchema);

export default Reservation;
