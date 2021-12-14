import { Schema, model } from 'mongoose';

const agendaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 150,
    },
    description: { type: String, maxlength: 150 },
    reservation: { type: Schema.Types.ObjectId, ref: 'ways', required: true },
    availableDays: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

const Agenda = model('agenda', agendaSchema);

export default Agenda;
