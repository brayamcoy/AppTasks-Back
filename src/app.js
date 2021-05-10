const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { createRoles } = require("./lib/config");

//Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
dotenv.config();
createRoles();

//Middleware
var corsOptions = {
  origin: "https://app-tasks-pwa.netlify.app",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use(authRouter);
app.use(userRouter);
app.use(tasksRouter);

module.exports = app;
