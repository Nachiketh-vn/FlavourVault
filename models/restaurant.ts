// models/restaurant.ts
import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  restaurantName: string;
  ownerName: string;
  city: string;
  restaurantContact: string;
  ownerContact: string;
  restaurantEmail: string;
  restaurantAddress: string;
  userEmail: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  city: { type: String, required: true },
  restaurantContact: { type: String, required: true },
  ownerContact: { type: String, required: true },
  restaurantEmail: { type: String, required: true },
  restaurantAddress: { type: String, required: true },
  userEmail: { type: String, required: true },
});

const Restaurant =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
