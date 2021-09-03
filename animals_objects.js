"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  const Animal = {
    name: "",
    type: "unknown",
    desc: "",
    age: 0,
  };
  jsonData.forEach((element) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const animal = Object.create(Animal);
    animal.name = getName(element.fullname);
    animal.type = getType(element.fullname);
    animal.desc = getDesc(element.fullname);
    animal.age = element.age;
    allAnimals.push(animal);
  });

  // TODO: MISSING CODE HERE !!!
  // Name "runs" from the beginning of fullname to the first space
  function getName(fullname) {
    const animalName = fullname.substring(0, fullname.indexOf(" "));
    return animalName;
  }

  // Type "runs" from the last space+1 to the end of fullname
  function getType(fullname) {
    const animalType = fullname.substring(fullname.lastIndexOf(" ") + 1);
    return animalType;
  }

  // Desc runs from the
  function getDesc(fullname) {
    const animalDesc = fullname.split(" ")[2];
    return animalDesc;
  }

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
