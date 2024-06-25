const ELEM_SCALE = document.getElementById("input-scale");
const ELEM_URL = document.getElementById("input-url");
const ELEM_IFRAME = document.getElementById("iframe-url");
const ELEM_FIELDSET = document.getElementById("fieldset-input");
const ELEM_SPINNER = document.querySelector(".lds-dual-ring");

const ELEM_INPUT_SAVE = document.getElementById("input-save");
const ELEM_SELECT_RESTORE = document.getElementById("select-restore");

let hidden = false;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let saveParam = 0;

if (urlParams.has("saveParam")) {
  saveParam = urlParams.get("saveParam");
}

let savedData = [];

const thisURL = "http://127.0.0.1:5500/webpage-zoom/index.html";

window.onload = function () {
  const restoredData = JSON.parse(localStorage.getItem("savedData"));
  if (restoredData != null) {
    savedData = restoredData;
  }
  for (let i = 0; i < savedData.length; i++) {
    const tempOption = document.createElement("option");
    tempOption.value = i;
    tempOption.innerText = savedData[i][0];
    ELEM_SELECT_RESTORE.appendChild(tempOption);
  }

  console.log("saveParam: " + saveParam);
  let index = searchIndex(saveParam);
  if (index != undefined) {
    hideInput();
    ELEM_SELECT_RESTORE.value = index;
    restoreData();
  }

  // open("http://127.0.0.1:5500/webpage-zoom/index.html?saveParam=" + , "_self");
};

function scaleChanged() {
  const scaleFactor = ELEM_SCALE.value;
  ELEM_IFRAME.style.height = String((1 / scaleFactor) * 100) + "%";
  ELEM_IFRAME.style.width = String((1 / scaleFactor) * 100) + "%";
  ELEM_IFRAME.style.scale = scaleFactor;
  // saveData();
}

function urlChanged() {
  ELEM_SPINNER.classList.remove("display-none");
  ELEM_IFRAME.src = ELEM_URL.value;
  // saveData();
}

function iframeClicked() {
  console.log("hi1");
  setTimeout(() => {
    console.log("hi2");
  }, 1000);
}

ELEM_IFRAME.addEventListener("click", function () {
  iframeClicked();
});

function hideInput() {
  if (hidden) {
    ELEM_FIELDSET.style.display = "block";
  } else {
    ELEM_FIELDSET.style.display = "none";
  }
  hidden = !hidden;
  // saveData();
}

function hideLoadingScreen() {
  ELEM_SPINNER.classList.add("display-none");
}

function saveData() {
  console.log("saveData");

  const saveName = ELEM_INPUT_SAVE.value;
  if (saveName == "") {
    window.alert("Save name must be provieded.");
    return;
  }
  if (searchIndex(saveName) != undefined) {
    window.alert("Save name must be unique.");
    return;
  }

  savedData.push([saveName, ELEM_URL.value, ELEM_SCALE.value]);

  localStorage.setItem("savedData", JSON.stringify(savedData));

  const tempOption = document.createElement("option");
  tempOption.innerText = saveName;
  ELEM_SELECT_RESTORE.appendChild(tempOption);

  open(thisURL + "?saveParam=" + saveName, "_self");
}

function restoreData() {
  let index = searchIndex(ELEM_SELECT_RESTORE.options[ELEM_SELECT_RESTORE.selectedIndex].innerText);
  if (index == null) return;

  ELEM_URL.value = savedData[index][1];
  ELEM_SCALE.value = savedData[index][2];
  // hidden = savedData[index][3];
}

function openURL() {
  const name = ELEM_SELECT_RESTORE.options[ELEM_SELECT_RESTORE.selectedIndex].innerText;
  open(thisURL + "?saveParam=" + name, "_self");
}

function deleteEntry() {
  console.log("deleteEntry");

  const name = ELEM_SELECT_RESTORE.options[ELEM_SELECT_RESTORE.selectedIndex].innerText;

  ELEM_SELECT_RESTORE.remove(ELEM_SELECT_RESTORE.selectedIndex);

  savedData.splice(searchIndex(name), 1);

  localStorage.removeItem(savedData);
  localStorage.setItem("savedData", JSON.stringify(savedData));

  console.log(savedData);
}

function searchIndex(name) {
  let index;
  for (let i = 0; i < savedData.length; i++) {
    if (savedData[i][0] != name) continue;
    index = i;
  }
  return index;
}
