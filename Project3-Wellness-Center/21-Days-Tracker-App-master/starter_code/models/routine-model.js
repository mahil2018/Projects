const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  session       : { type: Number},
  education     : { type: String },
  tips          : { type: String },
  imageRoutine  : { type: String },
  calories      : { type: Number, default: 0 },
  water         : { type: Number, default: 0 },
  sleep         : { type: Number, default: 0 },
  exercise      : { type: Number, default: 0 },
  member        : { type: Schema.Types.ObjectId, ref: "User" },
  feedbacks     : [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
  }, {
    timestamps: true
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;