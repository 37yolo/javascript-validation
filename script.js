const form = document.querySelector("#form");
const btn = document.querySelector(".btn");
const inputName = document.querySelector("input[name=inputName]");
const inputEmail = document.querySelector("input[name=inputEmail]");
const contents = document.querySelectorAll(".content");
const displayName = document.querySelector(".displayName");
const displayEmail = document.querySelector(".displayEmail");
const displayAction = document.querySelector(".displayAction");

let inputData = [];
getLocalStorage();

function nameValidate(name) {
  return /^([a-zA-Z ]){2,30}$/.test(name);
}

function emailValidate(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function updateLocalStorage() {
  const saveData = JSON.stringify(inputData);
  localStorage.setItem("data", saveData);
}

function getLocalStorage() {
  const reString = localStorage.getItem("data");
  if (reString !== null) {
    return inputData = JSON.parse(reString);
  }
}

function formSubmit(e) {
  e.preventDefault();
  if (!nameValidate(inputName.value)) {
    return alert("Please check your name...");
  }
  if (!inputEmail.value.trim() || !emailValidate(inputEmail.value)) {
    return alert("Please check your email...");
  }
  const pairs = {
    name: inputName.value,
    email: inputEmail.value,
  };
  inputData.push(pairs);
  form.reset();
  loadDisplay();
}

function cleardisplay() {
  contents.forEach((item) => (item.innerHTML = ""));
}

function loadDisplay() {
  cleardisplay();
  updateLocalStorage();
  getLocalStorage();
  inputData.forEach((item) => {
    const dname = document.createElement("div");
    const demail = document.createElement("div");
    const daction = document.createElement("div");
    dname.innerHTML = `${item.name}`;
    demail.innerHTML = `${item.email}`;
    daction.setAttribute("id", inputData.indexOf(item));
    daction.className = "actionBtn";
    daction.innerHTML = `
    <button class="edit">edit</button><button class="delete">delete</button>`;

    displayName.querySelector(".content").append(dname);
    displayEmail.querySelector(".content").append(demail);
    displayAction.querySelector(".content").append(daction);
  });

  document.querySelectorAll(".actionBtn").forEach((item) =>
    item.addEventListener("click", (e) => {
      if (e.target.className === "delete") {
        deleteItem(e.currentTarget);
      }
      if (e.target.className === "edit") {
        editItem(e.currentTarget);
      }
    })
  );
}

function deleteItem(item) {
  const index = item.getAttribute("id");
  inputData.splice(index, 1);
  loadDisplay();
}

function editItem(item) {
  if(btn.querySelector('button').className!=='saveEdit'){
  const index = item.getAttribute("id");
  btn.innerHTML = `<button type="button" class='saveEdit' value='${index}'>edit</button>`;
  inputName.value = `${inputData[index].name}`;
  inputEmail.value = `${inputData[index].email}`;
  inputData.splice(index, 1);
  loadDisplay();}
}

function formEdit(e) {
  if (e.target.className === "saveEdit") {
    if (!nameValidate(inputName.value)) {
      return alert("please check your name");
    }
    if (!inputEmail.value.trim() || !emailValidate(inputEmail.value)) {
      return alert("please check your email");
    }
    const index = document.querySelector(".saveEdit").value;
    const pairs = {
      name: inputName.value,
      email: inputEmail.value,
    };
    inputData.splice(index, 0, pairs);
    btn.innerHTML = `<button type="submit">save</button>`;
    form.reset();
    loadDisplay();
  }
}

loadDisplay();
form.addEventListener("submit", formSubmit);
form.addEventListener("click", formEdit);
