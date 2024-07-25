const User = require("../models/user");
const generateToken = require("../config/jwt");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = "";
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, role, token });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const generatedToken = generateToken(user._id, user.role);

    user.token = generatedToken;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generatedToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

const updateTokenUser = async (req, res) => {
  const { userid, generatedToken } = req.body;

  const user = await User.findById(userid);
  if (user) {
    user.token = generatedToken;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generatedToken,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

module.exports = { registerUser, authUser, updateTokenUser };
