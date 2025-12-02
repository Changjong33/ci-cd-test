const dogs = require("../data/dogsData");

// Get all dogs
exports.getDogs = (req, res) => {
  res.json(dogs);
};

// Add a new dog
exports.addDog = (req, res) => {
  const { name, breed, age } = req.body;
  const newDog = {
    id: dogs.length + 1,
    name,
    breed,
    age,
  };
  dogs.push(newDog);
  res.status(201).json(newDog);
};

// Delete a dog by ID
exports.deleteDog = (req, res) => {
  const { id } = req.params;
  const index = dogs.findIndex((dog) => dog.id === parseInt(id));
  if (index !== -1) {
    const deletedDog = dogs.splice(index, 1);
    res.json(deletedDog);
  } else {
    res.status(404).json({ error: "Dog not found" });
  }
};

// Update a dog by ID
exports.updateDog = (req, res) => {
  const { id } = req.params;
  const { name, breed, age } = req.body;
  const dog = dogs.find((dog) => dog.id === parseInt(id));
  if (dog) {
    dog.name = name || dog.name;
    dog.breed = breed || dog.breed;
    dog.age = age || dog.age;
    res.json(dog);
  } else {
    res.status(404).json({ error: "Dog not found" });
  }
};
