const User = require("../models/user");
const generateToken = require("../config/jwt");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = "";
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      response: "failed",
      status: 400,
      data: { message: "User already exists" },
    });
  }
  const user = await User.create({ name, email, password, role, token });
  if (user) {
    return res.status(201).json({
      response: "success",
      status: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
      },
    });
  } else {
    return res.status(400).json({
      response: "failed",
      status: 400,
      data: { message: "Invalid user data" },
    });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const generatedToken = generateToken(user._id, user.role);
    user.token = generatedToken;
    await user.save();
    return res.json({
      response: "success",
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generatedToken,
      },
    });
  } else {
    return res.status(401).json({
      response: "failed",
      status: 401,
      data: { message: "Invalid email or password" },
    });
  }
};

const updateTokenUser = async (req, res) => {
  const { userid, generatedToken } = req.body;
  const user = await User.findById(userid);
  if (user) {
    user.token = generatedToken;
    await user.save();
    return res.json({
      response: "success",
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generatedToken,
      },
    });
  } else {
    return res.status(404).json({
      response: "failed",
      status: 404,
      data: { message: "User not found" },
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json({
      response: "success",
      status: 200,
      data: customers.reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      response: "failed",
      status: 500,
      data: { message: "Server error", error: error.message },
    });
  }
};

const getStaffUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["staff"] } });
    res.json({
      response: "success",
      status: 200,
      data: users.reduce((acc, curr, index) => {
        acc[index] = curr;
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      response: "failed",
      status: 500,
      data: { message: "Server error", error: error.message },
    });
  }
};

module.exports = {
  registerUser,
  authUser,
  updateTokenUser,
  getCustomers,
  getStaffUsers,
};
