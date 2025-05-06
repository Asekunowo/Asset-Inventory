import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    require: [true, "First Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    unique: [true, "A user with this email already exists"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
