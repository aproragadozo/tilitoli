const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [String]
  });
  
  let Person = mongoose.model('Person', personSchema);
  Person.createIndexes();
  module.exports = Person;



// Use the model (optional)
function createSeed() {
    const doc = new Person({
        name: "Alma Barack",
        age: 34,
        favoriteFoods: ["spaghetti", "ice cream"]
    });
    console.log(doc);
    doc.save();
    const alma = Person.findOne({name:"Alma Barack"})
    .then((person => {
        console.log(person);
    }))
};