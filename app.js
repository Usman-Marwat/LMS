var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var teacherRouter = require("./routes/teacher");
var headRouter = require("./routes/head");

const app = express();

const dbURI =
  "mongodb+srv://netninja:test1234@cluster0.xgksb.mongodb.net/lms-marwat?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3001)) //listen after connecting with database
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
var cors = require("cors");
app.use(cors());

app.post("/post_name", async (req, res) => {
  let { name } = req.body;
  console.log(name);
});
app.get("/home", async (req, res) => {
  res.send("This is the data from home page");
});

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/head", headRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
