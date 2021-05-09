const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/apptasks", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongoose connected"))
  .catch((error) => console.log(error));
