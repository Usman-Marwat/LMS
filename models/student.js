var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var studentSchema = new Schema({
  name: {
    type: String,
  },
  rollno: {
    type: String,
  },
  result: {
    type: Number,
  },
});

module.exports = mongoose.model("Student", studentSchema);
