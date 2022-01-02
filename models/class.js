var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// const assignmentSchema = new mongoose.Schema({
//   assignments: {
//     type: [
//       {
//         assignNo: {
//           type: Number,
//         },
//       },
//     ],
//   },
// });

var classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
  },
  students: {
    type: [
      {
        sid: {
          type: mongoose.Types.ObjectId,
          ref: "Student",
        },
      },
    ],
  },
  courses: {
    type: [
      {
        courseName: {
          type: String,
        },
        assignments: {
          type: [
            {
              assignNo: {
                type: Number,
              },
              description: {
                type: String,
              },
            },
          ],
        },
        quizes: {
          type: [
            {
              quizNo: {
                type: Number,
              },
            },
          ],
        },
      },
    ],
  },
});

module.exports = mongoose.model("Class", classSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const assignmentSchema = new mongoose.Schema({
//   Number: {
//     type: Number,
//   },
//   Questions: [
//     {
//       question: {
//         type: String,
//       },
//       marks: {
//         type: Number,
//       },
//     },
//   ],
//   Attempted: [
//     {
//       studentid: {
//         type: String,
//       },
//       file: {
//         type: String,
//       },
//       filename: {
//         type: String,
//       },
//     },
//   ],
//   Material: [],
//   Results: [
//     {
//       studentid: {
//         type: String,
//       },
//       GPA: {
//         type: Number,
//       },
//     },
//   ],
// });

// const ClassSchema = new Schema({
//   name: {
//     type: String,
//     max: 40,
//   },
//   courses: [
//     {
//       courseid: {
//         type: String,
//       },
//       name: {
//         type: String,
//       },
//       teacherid: {
//         tid: {
//           type: Schema.Types.ObjectId,
//           ref: "Teacher",
//         },
//       },
//       students: [
//         {
//           sid: {
//             type: Schema.Types.ObjectId,
//             ref: "Student",
//           },
//         },
//       ],
//       quizes: [
//         {
//           question: [
//             {
//               type: String,
//             },
//           ],
//           answers: [
//             {
//               type: String,
//             },
//           ],
//           totalmarks: {
//             type: Number,
//           },
//         },
//       ],
//       assignment: [assignmentSchema],
//     },
//   ],
// });

// module.exports = Class = mongoose.model("class", ClassSchema);
