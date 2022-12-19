const express = require("express");
const app = express();

const port = 3000;

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

const { Schema } = mongoose;
const PersonSchema = new Schema({
  name: { type: String, required: true },

  age: Number,

  favoriteFoods: [String],
});

const PersonModel = mongoose.model("person", PersonSchema);
//save()
const newPerson = new PersonModel({
  name: "taher",
  age: 33,
  favoriteFoods: ["pasta", "couscous", "kafteji"],
});
newPerson.save(function (err) {
  if (err) return handleError(err);
});
//model.create()
let arrayOfPeople = [
  { name: "ali", age: 10, favoriteFoods: ["sweets", "couscous", "pizza"] },
  {
    name: "alia",
    age: 50,
    favoriteFoods: ["ratatouille", "couscous", "salade"],
  },
];

PersonModel.create(arrayOfPeople, (err, data) => {
  if (err) return handleError(err);
});

var findPeopleByName = function (personName) {
  const person = PersonModel.find({ name: personName }, function (err, data) {
    console.log();
    if (err) return handleError(err);
  });
};

var findOneByFood = function (food) {
  const person = PersonModel.findOne(
    { favoriteFoods: food },
    function (err, data) {
      if (err) return handleError(err);
    }
  );
};

var findPersonById = function (personId) {
  const person = PersonModel.findById({ _id: personId }, function (err, data) {
    if (err) return handleError(err);
  });
};


var findEditThenSave = function(personId, done) {
    const itemToAdd = 'hamburger'
    const person = PersonModel.findById({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      data.favoriteFoods.push(itemToAdd)
      data.save(function(err, data){
        if (err) {
          return done(err)
        }
        else {
          return done(null, data)
        }
      })
    })
  }
var findAndUpdate = function (personName) {
  var ageToSet = 20;
  const person = PersonModel.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (err, data) {
      if (err) return handleError(err);
    }
  );
};
var removeById = function (personId) {
  const person = PersonModel.findByIdAndRemove(
    { _id: personId },
    function (err, data) {
      if (err) return handleError(err);
    }
  );
};

var removeManyPeople = function () {
  var nameToRemove = "Mary";
  const person = PersonModel.remove(
    { name: nameToRemove },
    function (err, data) {
      if (err) return handleError(err);
    }
  );
};

var queryChain = function () {
  var foodToSearch = "burrito";
  const people = PersonModel.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return handleError(err);
    });
};

app.listen(port, (err) => {
  err
    ? csonsole.log(err)
    : console.log(`the server is running on port ${port}`);
});
