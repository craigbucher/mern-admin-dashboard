import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,   // must be unique within the database table/collection
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // *not* adding validations for simplicity's sake: (feel free to add)
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],  // enum = one of these values
      default: "admin",
    },
  },
  { timestamps: true }  // created_at, updated_at
);

const User = mongoose.model("User", UserSchema);
export default User;