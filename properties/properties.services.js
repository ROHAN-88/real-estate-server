import { Property } from "./properties.model.js";

import { checkMongooseIdValidity } from "../util/util.js";
import {
  getAllPropertyQuery,
  propertyValidation,
} from "./properties.validation.js";

//!@post property
export const postProperty = async (req, res) => {
  const properties = req.body;

  const userdata = req.userInfo;

  try {
    //check the valid mongo id

    const isValidId = checkMongooseIdValidity(userdata._id);

    if (!isValidId) {
      return res.status(403).json("MongoId is Invalid");
    }
    //validation of the body
    await propertyValidation.validateAsync(properties);

    //giving the sellerid the value form req.userInfo._id
    properties.selllerId = userdata._id;

    //check if property exist---
    const findProperty = await Property.findOne({
      propertyName: properties.propertyName,
    });

    if (findProperty) {
      return res.status(400).send("Property already exist");
    }
    //create a property table
    const data = await Property.create(properties);

    return res.status(200).json("Created");
  } catch (e) {
    return res.status(400).send(e.messages);
  }
};

//!get Property Detail

export const getPropertyDetail = async (req, res) => {
  // const property  = await Property.find();
  const query = req.body;
  try {
    await getAllPropertyQuery.validateAsync(query);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }

  const skip = (query.page - 1) * query.limit;
  const property = await Property.aggregate([
    {
      $match: {},
    },
    {
      $skip: skip,
    },
    {
      $limit: query.limit,
    },
  ]);

  return res.status(200).send(property);
};

//!get Property Detail by Id
export const getPropertyById = async (req, res) => {
  const property_Id = req.params.id;

  try {
    //check if valid mongo Id
    const isValidId = checkMongooseIdValidity(property_Id);
    if (!isValidId) {
      return res.status(401).send("Invalid Mongo Id");
    }

    //find property
    const propertyData = await Property.findOne({ _id: property_Id });
    if (!propertyData) {
      return res.status(401).json("No such property exist with that id");
    }

    return res.status(200).send(propertyData);
  } catch (e) {
    return res.status(400).send({ messages: e.messages });
  }
};

//!delete Property
export const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  const sellerDetail = req.userInfo;
  try {
    //check  if valid mongo id
    const isValidId = checkMongooseIdValidity(propertyId);
    if (!isValidId) {
      return res.status(401).send("Invalid MongoId");
    }
    //find property
    const findProperty = await Property.findOne({ _id: propertyId });
    if (!findProperty) {
      return res.status(401).json("Property Dose not exist");
    }
    //check if the id of the property sellerId and sellerId match
    if (findProperty.selllerId.toString() !== sellerDetail._id.toString()) {
      return res.status(401).json("Unauthorized--");
    }

    //delete the property with the id
    await Property.deleteOne({ _id: propertyId });

    return res.status(200).json("Deleting...");
  } catch (e) {
    return res.status(400).json({ messages: e.messages });
  }
};

//!update the property
export const updateProperty = async (req, res) => {
  const toUpdateId = req.params.id;
  const toUpdateDetail = req.body;
  const sellerId = req.userInfo._id;
  try {
    //check if valid id
    const isValidId = checkMongooseIdValidity(toUpdateId);
    if (!isValidId) {
      return res.status(401).json("Invalid mongoId");
    }
    //check if property exist
    const findProperty = await Property.findOne({ _id: toUpdateId });
    if (!findProperty) {
      return res.status(404).send("Property does not exist");
    }

    //check if property belongs to the seller
    if (findProperty.selllerId.toString() !== sellerId.toString()) {
      return res.status(401).json("Unauthorized--");
    }

    //validation of the body
    await propertyValidation.validateAsync(toUpdateDetail);

    //update the property

    const updatedProperty = await Property.updateOne(
      { _id: toUpdateId },
      {
        $set: {
          propertyName: toUpdateDetail?.propertyName,
          price: toUpdateDetail?.price,
          description: toUpdateDetail?.description,
        },
      }
    );
    return res.status(200).send({ updated: updatedProperty });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
