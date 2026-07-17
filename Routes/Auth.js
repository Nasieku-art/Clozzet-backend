import { Router } from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, phoneNumber, passWord } =
      req.body;
    if (!firstName || !lastName || !emailAddress || !phoneNumber || !passWord) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ emailAddress });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const savedUser = await new User({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      passWord,
    }).save();
    const token = generateToken(savedUser._id);
    res.status(201).json({ savedUser, token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailAddress, passWord } = req.body;
    if (!emailAddress || !passWord) {
      return res.status(400).json({ error: "Fields are empty!" });
    }

    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    //console.log(await user.matchPassword(passWord))
    //console.log(await bcrypt.compare(passWord, user.password))

    if (!(await user.matchPassword(passWord))) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/me", verifyToken, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "40mins" });
}

export default router;
