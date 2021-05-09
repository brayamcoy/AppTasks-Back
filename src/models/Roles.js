const { model, Schema } = require("mongoose");

//Default roles creted when server start
const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Roles = model("Roles", roleSchema);

module.exports = {
  ROLES,
  Roles,
};
