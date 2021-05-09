const { Users } = require("../models/Users");
const jwt = require("jsonwebtoken");
const { Roles } = require("../models/Roles");

const register = async (req, res) => {
  const { username, email, password, name, lastname, phone, roles } = req.body;

  const user = new Users({
    username,
    email,
    password: await Users.encryptPassword(password),
    name,
    lastname,
    phone,
    active: true,
  });

  if (roles) {
    const foundRoles = await Roles.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const roleDefault = await Roles.findOne({ name: "user" });
    user.roles = [roleDefault._id];
  }

  const savedUser = await user.save();
  console.log(savedUser);

  const token = await jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, //one day
  });

  res.status(200).json({ token });
};

const login = async (req, res) => {
  const userFound = await Users.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound)
    return res.status(400).json({ message: "Invalid username or password" });

  const matchPassword = await Users.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(400).json({ message: "Invalid username or password" });

  const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // un diá aprox
  });
  const user = `${userFound.name} ${userFound.lastname}`;
  console.log(userFound);
  res.json({ token: token, user: user });
};

module.exports = {
  register,
  login,
};
