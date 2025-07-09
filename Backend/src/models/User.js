const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
          throw new Error("Entered email is not valid");
      },
    },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: [18, "Min age is 18"], max: 99 }, // Assuming age is a number between 0 and 120
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (["male", "female", "other"].indexOf(value) === -1)
          throw new Error("Entered gender is not valid");
      },
    },
    about: { type: String, default: "This is default About section" },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Entered photo URL is not valid");
        }
      },
    },
    createdAt: { type: Date, default: Date.now },
    skills: { type: [String], default: [] },
  },
  {
    timestamps: true,
    methods: {
      getJWT: function () {
        return  jwt.sign({ _id: this._id }, "HelloNode@1234",{expiresIn: "7d"}); // Generate JWT token with a 7-day expiration
      },
      comparePassword: function (password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
