var express = require("express");
var router = express.Router();
var Admin = require("../models/admin");
var Class = require("../models/class");
var Teacher = require("../models/teacher");
var Student = require("../models/student");

/* GET Operations */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/classes", function (req, res, next) {
  Class.find({})
    .populate("teacher")
    .populate("students.sid")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.json(results);
    });
});

router.get("/graph", function (req, res, next) {
  Class.find({})
    .populate("teacher")
    .populate("students.sid")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.json(results);
    });
});

router.delete("/deleteAssignment/:id", function (req, res, next) {
  console.log("hi");
  Class.updateOne(
    { "courses.assignments._id": req.params.id },
    { $pull: { "courses.$.assignments": { _id: req.params.id } } }
  ).exec(function (error, results) {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});

router.get("/students", function (req, res, next) {
  Student.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});
router.get("/teachers", function (req, res, next) {
  Teacher.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});
router.get("/classes/:id", function (req, res, next) {
  Class.find({ _id: req.params.id })
    .populate("teacher")
    .populate("students.sid")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});
router.get("/students/:id", function (req, res, next) {
  Student.findById(req.params.id)
    .then(
      (student) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(student);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
router.get("/teachers/:id", function (req, res, next) {
  Teacher.findById(req.params.id)
    .then(
      (teacher) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(teacher);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
//POST Operations
router.post("/addteacher", function (req, res, next) {
  Teacher.create(req.body)
    .then(
      (teacher) => {
        console.log("Teacher has been Added ", teacher);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(teacher);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
router.post("/addclass", function (req, res, next) {
  console.log("Hi");
  console.log(req.body);
  Class.create(req.body)
    .then(
      (result) => {
        console.log("Class has been Added ", result);
        // res.statusCode = 200;
        // res.setHeader("Content-Type", "application/json");
        // res.json(result);
        res.send(result);
      }
      //   (err) => next(err)
    )
    .catch((err) => res.send(err.message));
});
router.get("/addclassnew", async function (req, res, next) {
  try {
    obj = {
      name: "Demo",
      teacher: "61e41a8d70eb7c1c1000a0e9",
      students: [
        { sid: "61e41d6d0a94192ac88ca85b" },
        { sid: "61e41d710a94192ac88ca85d" },
        // { sid: "61e41d740a94192ac88ca85f" },
        // { sid: "61e41d760a94192ac88ca861" },
        // { sid: "61e41e130a94192ac88ca865" },
      ],
      courses: [
        {
          courseName: "TCS CS12",

          assignments: [
            {
              assignNo: 3,
              description: "Do the Lab task",
            },
            {
              assignNo: 1,
              description: "Do Practicle assignment",
            },
            {
              assignNo: 3,
              description: "Complete the task metioned in class",
            },
            {
              assignNo: 5,
              description: "Have the group task done ",
            },
            {
              assignNo: 32,
              description: "Make Expresa and node Routes for your project",
            },
            {
              assignNo: 12,
              description: "Comple the FYP routes ",
            },
          ],
          quizes: [
            {
              quizNo: 7,
            },
          ],
        },
      ],
    };
    const class1 = await Class.create(obj);
    res.send(class1);
  } catch (err) {
    res.send(err.message);
  }
});
router.post("/addstudent", function (req, res, next) {
  Student.create(req.body)
    .then(
      (student) => {
        console.log("Student has been Added ", student);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(student);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
//PUT Operations
router.put("/assign/:cid/Student/:sid", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.cid },
    {
      $push: {
        students: {
          sid: req.params.sid,
        },
      },
    },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    }
  );
});

router.patch("/class/:cid/teacher/:tid", function (req, res, next) {
  Class.findOneAndUpdate(
    { _id: req.params.cid },
    { teacher: req.params.tid },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    }
  );
});
router.put("/class/:cid", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/assignteacher/:tid", async function (req, res, next) {
  try {
    const teacher = await Teacher.findById(req.params.tid);
    teacher.name = req.body.name;
    teacher.age = req.body.age;
    teacher.gender = req.body.gender;
    teacher.email = req.body.email;
    teacher.salary = req.body.salary;
    teacher.contact = req.body.contact;
    await teacher.save();
    res.send(teacher);
  } catch (err) {
    res.send(err.message);
  }
});

//Delete Operations
router.delete("/delteacher/:id", function (req, res, next) {
  Teacher.deleteOne({ _id: req.params.id }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});
router.delete("/delclass/:id", function (req, res, next) {
  Class.deleteOne({ _id: req.params.id }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});
//dmska
router.delete("/delstudent/:id", function (req, res, next) {
  Student.deleteOne({ _id: req.params.id }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});
module.exports = router;
