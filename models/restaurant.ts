import { Schema, model, Document } from "mongoose";

// Define a TypeScript interface for the restaurant data
export interface IRestaurant extends Document {
  restaurantName: string;
  ownerName: string;
  city: string;
  restaurantContact: string;
  ownerContact: string;
  restaurantEmail: string;
  restaurantAddress: string;
}

// Mongoose schema for the restaurant
const RestaurantSchema = new Schema<IRestaurant>(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantContact: {
      type: String,
      required: true,
      trim: true,
    },
    ownerContact: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantEmail: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
const Restaurant = model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
