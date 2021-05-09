const jwt = require("jsonwebtoken");
const { Users } = require("../models/Users");
const { ROLES } = require("../models/Roles");
const { Roles } = require("../models/Roles");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res
        .status(403)
        .json({ message: "The token has not been provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = Users.findById(decoded.id, { password: 0 });

    if (!user)
      return res.status(404).json({ message: "To access you must register" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "You must provide a valid token" });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id);
    const roles = await Roles.find({
      _id: {
        $in: user.roles,
      },
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res
      .status(403)
      .json({ message: "You need to be a moderator role for this action!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id);
    const roles = await Roles.find({
      _id: {
        $in: user.roles,
      },
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({
      message: "The administrator role is required for this action!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: "User already exists " });
    const email = await Users.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkPasswordIsValid = async (req, res, next) => {
  try {
    const password = req.body.password;
    const passwordHaveANumber = /[0-9]/.test(password);
    const passwordHaveACapitalLetter = /[A-Z]/.test(password);
    let spaces = false;
    let cont = 0;

    while (!spaces && cont < password.length) {
      if (password.charAt(cont) == " ") spaces = true;
      cont++;
    }

    if (spaces)
      return res.status(400).json({
        message: "Password cannot contain blank spaces",
      });

    if (password.length < 7)
      return res
        .status(400)
        .json({ message: "The password must have a minimum of 7 characters" });

    if (!passwordHaveANumber)
      return res
        .status(400)
        .json({ message: "Password must have at least one number" });

    if (!passwordHaveACapitalLetter)
      return res.status(400).json({
        message: "Password must have at least one capital letter",
      });

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} Does not exist try again`,
        });
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkPasswordIsValid,
  checkRolesExisted,
  verifyToken,
  isModerator,
  isAdmin,
};
