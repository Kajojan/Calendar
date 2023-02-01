const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const createUser = async (req, res) => {
    const { user_id, name, lastname, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
  
    const token = jwt.sign(
      {
        user: user_id,
      },
      process.env.JWT_SECRET
    );
  
    const userCkeck = await User.find({ email: email });
    if (userCkeck.length == 0) {
      try {
        const user = await User.create({
          user_id,
          name,
          lastname,
          email,
          password: passwordHash,
        });
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .send();
      } catch (error) {
        res.json({ status: "error", error: "Duplicate email" });
      }
    } else {
      res.json({ status: "error", error: "Duplicate email" });
    }
  };



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const check = await User.find({ email: email });
      if (check) {
        const paswordCorret = await bcrypt.compare(password, check[0].password);
        if (!paswordCorret) {
          return res.status(401).json({ message: "Wrong  password" });
        }
        const token = jwt.sign(
          {
            user: check[0].user_id,
          },
          process.env.JWT_SECRET
        );
  
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(check);
      } else {
        res.status(401).json({ message: "Wrong Email od password" });
      }
    } catch {
      res.status(400).json({ error: "Wrong" });
    }
  };


  const logout = async (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  };



  const loggedIn = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
      const data = await User.find({ user_id: jwt.decode(token).user });
      res.send({ status: true, data: data[0] });
    } catch (err) {
      res.json({ status: false });
    }
  };


  module.exports={
    createUser,
    login,
    logout,
    loggedIn,
    
  }