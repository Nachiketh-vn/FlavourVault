import mongoose, { Schema } from "mongoose";

// Define the dish schema
const dishSchema = new Schema({
  dishName: { type: String, required: true },
  description: { type: String, required: true },
  prices: [
    {
      quantity: { type: String, required: true }, // e.g., "Small", "Medium", "Large"
      price: { type: Number, required: true, min: 0 }, // Price for the quantity
      serves: { type: Number, required: true }, // Number of people it serves
    },
  ],
  image: { type: String, default: "" }, // Optional image field
  spiciness: { type: Number, required: true },
  inStock: { type: Boolean, default: true }, // Availability status
  isVeg: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false }, // If the dish is a best-seller
  todaysSpecial: { type: Boolean, default: false }, // Flag for today's special
  mustTry: { type: Boolean, default: false }, // Flag for recommended dishes
});

// Define the section (segment) schema
const sectionSchema = new Schema({
  sectionName: { type: String, required: true },
  dishes: [dishSchema],
});

// Define the menu schema, referencing the restaurant by ID
const menuSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    sections: [sectionSchema],
    totalbs: { type: Number, required: true },
    totalts: { type: Number, required: true },
    totalmt: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create and export the Menu model
const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
