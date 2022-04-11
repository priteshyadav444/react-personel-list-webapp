const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

//routes
const items = require("./routes/itemRoute");
const users = require("./routes/userRoute");
const auth = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 3303;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err.message));

//Routes URL Handle
app.use("/items", items);
app.use("/users", users);
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("clients/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`Server Running On ${PORT}`));
