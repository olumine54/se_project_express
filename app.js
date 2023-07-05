const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { createUser, login } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133",
//   };
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(helmet());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);

app.listen(PORT, () => {});
