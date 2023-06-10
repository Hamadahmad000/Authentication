const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
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
  profile: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// HASHING PASSWORD
authSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
  } catch (error) {
    console.log("Error While Hashing Password", error.message);
  }
});
// COMPARING HASHED PASSWROD
authSchema.methods.ComparePassword = async function (password) {
  if (!password) throw new Error("Password is missing Cannot Compare");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while Comparing password", error.message);
  }
};

const USER = mongoose.model("authUsers", authSchema);

module.exports = USER;
