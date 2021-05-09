const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkPasswordIsValid,
} = require("../middlewares/auth");

const { verifyToken, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/api/v1/users", verifyToken, getUser);

router.get("/api/v1/users/:id", verifyToken, getUserById);

router.post(
  "/api/v1/users",
  [checkDuplicateUsernameOrEmail, checkPasswordIsValid, checkRolesExisted],
  createUser
);

router.put("/api/v1/users/:id", verifyToken, updateUserById);

router.delete("/api/v1/users/:id", [verifyToken, isAdmin], deleteUserById);

module.exports = router;
