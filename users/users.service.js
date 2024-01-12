import Jwt from "jsonwebtoken";
import { User } from "./users.model.js";
import { loginValidation, userRegisterValidation } from "./users.validation.js";
import bcrypt from "bcrypt";
//!validation============
export const validationUser = async (req, res, next) => {
  const data = req.body;
  try {
    await userRegisterValidation.validateAsync(data);
    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//!Register===============
export const register = async (req, res) => {
  const userData = req.body;

  try {
    const userFind = await User.findOne({ email: userData.email });
    if (userFind) {
      return res.status(401).json("User Already Exists");
    }

    // if (userData.password !== userData.confrimPassword) {
    //   return res.status(422).json("Passsword and Confrim Password must Match");
    // }

    const passwordHash = await bcrypt.hash(userData.password, 8);
    userData.password = passwordHash;

    await User.create(userData);

    return res.status(200).json("Registed");
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//!login ===============
export const login = async (req, res) => {
  const loginData = req.body;

  try {
    await loginValidation.validateAsync(loginData);

    const findUser = await User.findOne({ email: loginData.email });
    if (!findUser) {
      return res.status(404).json("User not found");
    }

    //?===bcrypt=====

    const passwordMatch = await bcrypt.compare(
      loginData.password,
      findUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json("Invalid Credential");
    }

    //!Token jwt
    const accesstoken = Jwt.sign(
      { email: findUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );

    return res.status(200).json({ findUser, accesstoken });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
