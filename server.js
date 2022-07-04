const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const userRouter = require("./resources/users/user.router");
const mainRouter = require("./routers/main.router");
const authRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("static"));
app.use(fileUpload());

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/", adminRouter);
app.use("/api", userRouter);

app.use(function (req, res) {
  res.render("error/404.ejs");
});

app.listen(process.env.PORT || 5000);
