const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session       : { type: Number},
  education     : { type: String },
  tips          : { type: String },
  imageSession  : { type: String },
  calories      : { type: Number, default: 0 },
  water         : { type: Number, default: 0 },
  sleep         : { type: Number, default: 0 },
  exercise      : { type: Number, default: 0 },
  owner        : { type: Schema.Types.ObjectId, ref: "User" },
  feedbacks     : [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
  }, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;