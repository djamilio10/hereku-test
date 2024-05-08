const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema = mongoose.Schema(
  {
    prenom: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    nom: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      require: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Correction de l'expression régulière
    },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("userv", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    prenom: Joi.string().required().label("Prenom"),
    nom: Joi.string().required().label("Nom"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
userSchema.virtual("fullname").get(function () {
  return this.prenom + " " + this.nom;
});
module.exports = { User, validate };
