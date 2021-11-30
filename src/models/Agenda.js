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
    project: { type: Schema.Types.ObjectId, ref: 'ways', required: true },
  },
  {
    timestamps: true,
  },
);

const Agenda = model('agenda', agendaSchema);

export default Agenda;
