const express = require("express");
const router = express.Router();
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkPasswordIsValid,
} = require("../middlewares/auth");

const { register, login } = require("../controllers/auth");

router.post(
  "/api/auth/register",
  [checkDuplicateUsernameOrEmail, checkPasswordIsValid, checkRolesExisted],
  register
);
router.post("/api/auth/login", login);

module.exports = router;
