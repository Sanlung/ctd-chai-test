document.addEventListener("DOMContentLoaded", (event) => {
  const addPerson = document.getElementById("addPerson");
  const getPerson = document.getElementById("getPerson");
  const listPeople = document.getElementById("listPeople");
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const index = document.getElementById("index");
  const result = document.getElementById("result");
  addPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name.value, age: Number(age.value)}),
      });
      const data = await response.json();
      result.innerHTML = data.message;
    } catch (err) {
      result.innerHTML = err.message;
    }
  });

  listPeople.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/people", {
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      if (!data.people.length) {
        result.innerHTML = "There's no one to display";
      } else {
        result.innerHTML = JSON.stringify(data.people);
      }
    } catch (err) {
      result.innerHTML = err.message;
    }
  });

  getPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    const id = encodeURIComponent(index.value);
    try {
      const response = await fetch(`/api/v1/people/${id}`, {
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      result.innerHTML = data.message
        ? data.message
        : JSON.stringify(data.person);
    } catch (err) {
      result.innerHTML = err.message;
    }
  });
});
