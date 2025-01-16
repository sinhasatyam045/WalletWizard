const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    console.log("Request", req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({ 
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  console.log("Request", req.body);
  try {
    const newUser = new userModel(req.body);
    const user = await newUser.save();
    console.log("User", user);
    res.status(201).json({
      success: true,
      newUser,
    });
    console.log(res);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
