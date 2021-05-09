const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongoose connected"))
  .catch((error) => console.log(error));
