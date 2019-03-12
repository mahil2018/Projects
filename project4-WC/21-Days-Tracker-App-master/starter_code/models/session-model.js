const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session       : { type: Number},
  education     : { type: String },
  tips          : { type: String },
  imageSession  : { type: String },
  calories      : { type: Number, default: 2000 },
  water         : { type: Number, default: 8 },
  sleep         : { type: Number, default: 8 },
  exercise      : { type: Number, default: 60 },
  member        : { type: Schema.Types.ObjectId, ref: "User" },
  feedbacks     : [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
  }, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;