const { model, Schema } = require("mongoose");

const taskSchema = new Schema(
  {
    content: String,
    date: Date,
    is_completed: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Tasks = model("Tasks", taskSchema);

module.exports = {
  Tasks,
};
