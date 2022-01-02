var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/graph", async function (req, res, next) {
  try {
    const coursesclasses = await Class.find({}, { courses: 1 });
    res.send(classes);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
