var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  salary: {
    type: Number,
  },
  contact: {
    type: String,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
