const express = require("express");
const Item = require("../modal/item");
const auth = require("../middleware/auth");
const User = require("../modal/User");
const { ObjectID } = require("mongodb");
const router = express.Router();

// api > /items/
//desc > return all items
//access > public
router.get("/", (req, res) => {
  const _id = req.headers["authuser"];
  User.distinct("items", { _id })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error:" + err));
});

// api > /itenms/add
//desc > add items return added item
//access > public
router.post("/add", auth, (req, res) => {
  const data = req.body;

  var _id = ObjectID();
  newitemdata = { itemname: data.itemname, _id: _id };
  User.updateOne(
    { _id: data.authUser },
    { $push: { items: newitemdata } },
    function (err, collection) {
      if (err) throw err;
      res.json(newitemdata);
    }
  );
});

// api > /items/delete/:id id require
//desc > delete as per id
//access > protected
router.delete("/delete/:id", auth, (req, res) => {
  const authUser = req.headers["authuser"];
  User.updateOne(
    { _id: authUser },
    { $pull: { items: { _id: req.params.id } } },
    function (err, collection) {
      if (err) throw err;
      res.json({ msg: "Deleted" });
    }
  );
});

module.exports = router;
