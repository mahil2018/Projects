const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name        : { type: String },
    description : { type: String },
    imagePlan   : { type: String },
    sessions    : [{ type: Schema.Types.ObjectId, ref: "Session" }],
    reviews     : [{ type: Schema.Types.ObjectId, ref: "Feedback" }]
    
}, {
    timestamps: true
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;