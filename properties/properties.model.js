import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema({
  propertyImage: {
    type: String,
    required: false, //todo make it true after the cloudinary setup
  },
  propertyName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["buy", "sell", "rent"],
  },
  selllerId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

export const Property = mongoose.model("Property", propertiesSchema);
