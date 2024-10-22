import mongoose, { Schema } from "mongoose";

// Define the review schema
const reviewSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant", // Reference to the Restaurant model
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Star rating between 1 and 5
    },
    experience: {
      type: String,
      required: true, // User's review of their experience
    },
    suggestions: {
      type: String, // Optional field for suggestions
      default: "", // Defaults to an empty string if not provided
    },
    reviewerName: {
      type: String,
      default: "Anonymous", // Optional reviewer name
    },
    reviewerEmail: {
      type: String,
      default: "", // Optional reviewer email
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create and export the Review model
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
