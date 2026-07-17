import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    emailAddress: { type: String, required:true, unique:true },
    phoneNumber: { type: String, required:true, unique:true },
    passWord: { type: String, required:true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("passWord")) return;
  const salt = await bcrypt.genSalt(10);
  this.passWord = await bcrypt.hash(this.passWord, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passWord);
};

const User = mongoose.model("User", userSchema);
export default User;
 