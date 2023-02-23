import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  email: String,
  name: String,
  city: String,
});

const User = mongoose.model("User", userSchema);

// module.exports = User;
export default User;
