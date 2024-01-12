import express from "express";
import { isSeller, isUser } from "../authitication/authitication.js";
import {
  deleteProperty,
  getPropertyById,
  getPropertyDetail,
  postProperty,
  updateProperty,
} from "./properties.services.js";

const routes = express.Router();

//?Post property in the database
routes.post("/properties/addProperties", isSeller, postProperty);

//todo push properties of the same use in array---in buyer Cart

//?get property detail
routes.post("/properties/getPropertyDetail", isUser, getPropertyDetail);

//?get property by id
routes.get("/properties/getDetailId/:id", isUser, getPropertyById);

//?delete property
routes.delete("/properties/deleteProperty/:id", isSeller, deleteProperty);

//?update property
routes.put("/properties/update/:id", isSeller, updateProperty);
export default routes;
