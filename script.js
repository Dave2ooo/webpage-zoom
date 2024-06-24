const ELEM_SCALE = document.getElementById("input-scale");
const ELEM_URL = document.getElementById("input-url");
const ELEM_IFRAME = document.getElementById("iframe-url");
const ELEM_FIELDSET = document.getElementById("fieldset-input");
const ELEM_SPINNER = document.querySelector(".lds-dual-ring");

let hidden = false;

window.onload = function () {
  restoreData();
  scaleChanged();
  urlChanged();
};

function scaleChanged() {
  const scaleFactor = ELEM_SCALE.value;
  ELEM_IFRAME.style.height = String((1 / scaleFactor) * 100) + "%";
  ELEM_IFRAME.style.width = String((1 / scaleFactor) * 100) + "%";
  ELEM_IFRAME.style.scale = scaleFactor;
  saveData();
}

function urlChanged() {
  ELEM_SPINNER.classList.remove("display-none");
  ELEM_IFRAME.src = ELEM_URL.value;
  saveData();
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
}

function hideLoadingScreen() {
  ELEM_SPINNER.classList.add("display-none");
}

function saveData() {
  localStorage.setItem("URL", ELEM_URL.value);
  localStorage.setItem("scale", ELEM_SCALE.value);
}

function restoreData() {
  ELEM_URL.value = localStorage.getItem("URL");
  ELEM_SCALE.value = localStorage.getItem("scale");
}
