const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now() },
    items: [
      {
        itemname: { type: String },
        _id: { type: Schema.Types.ObjectId },
        created_time: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = moongoose.model("User", UserSchema);
module.exports = User;
