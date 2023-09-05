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
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(helmet());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(cors());
app.use(express.json());

app.post("/signin", validateLogIn, login);
app.post("/signup", validateUserInfo, createUser);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
