import Jwt from "jsonwebtoken";
import { User } from "../users/users.model.js";

//!Seller authorization
export const isSeller = async (req, res, next) => {
  //extract token from the header
  const authorization = req?.headers?.authorization;
  const splitterArray = authorization?.split(" ");
  const token = splitterArray[1];

  //if not token --terminate
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    //decrypt the token
    const userData = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: userData.email });

    //check if user exist
    if (!user) {
      return res.status(401).json("Unauthorized");
    }
    //check id user role = to seller
    if (user.role !== "seller") {
      return res.status(401).json("Unauthorized");
    }

    //add user Info to req method
    req.userInfo = user;
    next();
  } catch (e) {
    return res.status(200).send(e.messages);
  }
};

//!Buyer authorization
export const isBuyer = async (req, res, next) => {
  //extract token from the header
  const authorization = req?.headers?.authorization;
  const splitterArray = authorization?.split(" ");
  const token = splitterArray[1];

  //if not token --terminate
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    //decrypt the token
    const userData = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: userData.email });

    //check if user exist
    if (!user) {
      return res.status(401).json("Unauthorized");
    }
    //check id user role = to seller
    if (user.role !== "buyer") {
      return res.status(401).json("Unauthorized");
    }

    //add user Info to req method
    req.userInfo = user;
    next();
  } catch (e) {
    return res.status(200).send(e.messages);
  }
};
//! is user authorization
export const isUser = async (req, res, next) => {
  //extract token from the header
  const authorization = req?.headers?.authorization;
  const splitterArray = authorization?.split(" ");
  const token = splitterArray[1];

  //if not token --terminate
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    //decrypt the token
    const userData = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: userData.email });

    //check if user exist
    if (!user) {
      return res.status(401).json("Unauthorized");
    }

    //add user Info to req method
    req.userInfo = user;
    next();
  } catch (e) {
    return res.status(400).send(e.messages);
  }
};
