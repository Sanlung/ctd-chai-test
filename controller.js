let people = [];

const addPerson = (req, res) => {
  const message = [];
  if (!req.body.name || !req.body.age || req.body.age < 1) {
    if (!req.body.name) {
      message.push("Please enter a name");
    }
    if (!req.body.age || req.body.age < 1) {
      message.push("Please enter an age greater than 0");
    }
    res.status(400).json({message: message.join("; ")});
  } else {
    const person = {name: req.body.name, age: req.body.age};
    people = [...people, person];
    res.status(201).json({message: "A person was added"});
  }
};

const getPeople = (req, res) => {
  res.status(200).json({people});
};

const getPerson = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id >= people.length) {
    res.status(404).json({message: "The person entry does not exist"});
  } else {
    const person = people[id];
    res.status(200).json({person});
  }
};

module.exports = {addPerson, getPeople, getPerson};
