// IMPORTS
import {
  wordMeaningTemplate,
  loadingTemplate,
  meaningLessWordTemplate,
  saveWordTemplate,
  wordHeadTemplate,
} from "./template.js";

// INITIALIZATIONS
const inputWord = document.getElementById("inputWord");
const submitBtn = document.getElementById("submitBtn");
const validCheck = document.getElementById("validCheck");
const mainRow = document.getElementById("mainRow");
const clearBtnSearches = document.getElementById("clearSearchesBtn");
const previousSearchesContainer = document.getElementById(
  "previousSearchesContainer"
);
const previousSavedContainer = document.getElementById(
  "previousSavedContainer"
);
const clearSavedBtn = document.getElementById("clearSavedBtn");
const wordHead = document.getElementById("wordHead");
const saveIcon = document.getElementById("saveIcon");

// KEY AND URL
const KEY = "71d94889-f08c-4e0a-a875-e1fdf81e22a4";
const URL = `https://dictionaryapi.com/api/v3/references/sd4/json`;

// ADD SPINNER
function addSpinner() {
  mainRow.insertAdjacentHTML("beforeend", loadingTemplate());
}

// REMOVE SPINNER
function removeSpinner() {
  const spinnerElement = document.getElementById("spinnerElement");
  mainRow.removeChild(spinnerElement);
}

// CHECKING DATA FROM API
function checkData(word, data) {
  if (data.length === 0) {
    mainRow.insertAdjacentHTML("beforeend", meaningLessWordTemplate(word));
  } else {
    data.forEach((element) => {
      addSpinner();
      const { fl: partsOfSpeech, shortdef: defsArray } = element;
      // console.log(partsOfSpeech, defsArray);
      if (defsArray.length === 0) {
        removeSpinner();
      } else {
        const resultHtml = wordMeaningTemplate(word, partsOfSpeech, defsArray);
        removeSpinner();
        mainRow.insertAdjacentHTML("beforeend", resultHtml);
      }
    });
  }
}
// FETCH FROM API
const fetchFromApi = async (word) => {
  try {
    const response = await fetch(`${URL}/${word}?key=${KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    console.log(word, result);
    checkData(word, result);
  } catch (error) {
    console.error("Error fetching word meaning:", error);
  }
};

// REGISTREING PREVIOUS SEARCHES
function registerSearch(givenWord) {
  const html = saveWordTemplate(givenWord);

  previousSearchesContainer.insertAdjacentHTML("beforeend", html);
}

// CLEARING SEARCHES

clearBtnSearches.addEventListener("click", function () {
  previousSearchesContainer.innerHTML = "";
});

clearSavedBtn.addEventListener("click", function () {
  previousSavedContainer.innerHTML = "";
});

// LODING THE WORD AGAIN
function loadWordAgain(e) {
  const clickedEl = e.target;
  if (clickedEl.classList.contains("btn-primary")) {
    const selectedWord = clickedEl.dataset.text;
    mainRow.innerHTML = "";

    fetchFromApi(selectedWord);
  }
}

previousSearchesContainer.addEventListener("click", loadWordAgain);

previousSavedContainer.addEventListener("click", loadWordAgain);

// REGISTREING SAVED WORD
function registerSaved(givenWord) {
  const html = saveWordTemplate(givenWord);
  console.log(html);
  previousSavedContainer.insertAdjacentHTML("beforeend", html);
}

// ON SAVE ICON CLICK
function saveWord() {
  const givenWord = document.getElementById("wordHead").textContent;
  console.log(givenWord);
  registerSaved(givenWord);
}

saveIcon.addEventListener("click", saveWord);

function addSaveEventListener() {
  const saveIcon = document.getElementById("saveIcon");
  saveIcon.addEventListener("click", saveWord);
}

// SUBMIT FUNCTION
const getWordMeaning = function (e) {
  e.preventDefault();
  const givenWord = inputWord.value;
  inputWord.value = "";
  // console.log(givenWord);
  if (givenWord === "") {
    validCheck.style.display = "block";
  } else {
    mainRow.innerHTML = "";
    validCheck.style.display = "none";

    fetchFromApi(givenWord);
    registerSearch(givenWord);
    mainRow.insertAdjacentHTML("beforeend", wordHeadTemplate(givenWord));
    addSaveEventListener();
  }
};

submitBtn.addEventListener("click", (event) => getWordMeaning(event));

// INITAL FETCHING
fetchFromApi("country");
