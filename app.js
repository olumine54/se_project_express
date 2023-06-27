const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
const helmet = require("helmet");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r);
});

const routes = require("./routes");
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.use(express.json());
app.use(routes);
app.use(helmet());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("this is working");
});
