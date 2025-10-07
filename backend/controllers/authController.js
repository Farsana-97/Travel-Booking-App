import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registeration

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ error: "Username already existed" });
    }

    const mail = await User.findOne({ email });
    if (mail) {
      return res.json({ error: "Email already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.json({ error });
  }
};

// Login


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.SECRET,{expiresIn:"1d"});
    res.json({ message: "User Logged In Successfully", token ,role:user.role,userId:user._id});
  } catch (error) {
    res.json({ error });
  }
};

// Logout

export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
