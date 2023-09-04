require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewear/logger");
const { errorHandler } = require("./middlewear/error-handler");
const { createUser, login } = require("./controllers/users");
const { validateUserInfo, validateLogIn } = require("./middlewear/validation");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(helmet());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.post("/signin", validateUserInfo, login);
app.post("/signup", validateLogIn, createUser);

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
