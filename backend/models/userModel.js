const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter you Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should  have more 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter you Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter you Password"],
    minLength: [8, "Paasword should be greater than 8 characters"],
    select: false,
  },
  avatar: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    
    
    this.password = await bcrypt.hash(this.password, 10);
})


module.exports = mongoose.model("User", userSchema);