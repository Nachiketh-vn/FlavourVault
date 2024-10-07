import mongoose, { Schema, model, models, Document } from "mongoose";

// Define an interface for the user model, which extends the mongoose Document
export interface IUser extends Document {
  name: string;
  contact_number: string | number;
  email: string;
  password: string;
}

// Define the schema with the IUser interface
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Use the "models" object to check for an existing model to avoid recompiling the schema
const User = models.User || model<IUser>("User", userSchema);

export default User;
