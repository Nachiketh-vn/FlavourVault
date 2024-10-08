import mongoose, { Schema } from "mongoose";

// Define the dish schema
const dishSchema = new Schema({
  dishName: { type: String, required: true },
  description: { type: String, required: true },
  prices: [
    {
      quantity: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      serves: { type: Number, required: true, min: 1 },
    },
  ],
  image: { type: String, default: "" }, // Optional image field
  inStock: { type: Boolean, required: true, default: true }, // Availability flag updated from 'available'
});

// Define the section (segment) schema
const sectionSchema = new Schema({
  name: { type: String, required: true }, // Updated to match your submission structure
  dishes: [dishSchema],
});

// Define the menu schema, referencing the restaurant
const menuSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    segments: [sectionSchema], // Updated to match your submission structure
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create and export the Menu model
const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
