// Récupération des différents éléments
const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const synonyms = document.querySelector(".synonyms .list");
const infoText = document.querySelector(".info__text");
const removeIcon = document.querySelector("#delete__icon");

// FetchAPI function
const fetchAPI = (word) => {
  container.classList.remove("active");
  infoText.style.color = "#000000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  // Fetch api response
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word)); // Function data call
};

// Search synonyms function
const search = (word) => {
  searchInput.value = word;
  // Function fetchAPI call
  fetchAPI(word);
  container.classList.add("active");
};

// Data function
const data = (result, word) => {
  if (result.title) {
    // If api returns the message of can't find word
    infoText.textContent = `Can't find the meaning of <span>${word}</span>. Please try again.`;
  } else {
    console.log(result);
    container.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;

    // Let's pass the particular response data to a particular HTML element
    document.querySelector(".word p").textContent = result[0].word;
    document.querySelector(".word span").textContent = phonetics;
    document.querySelector(".meaning span").textContent =
      definitions.definition;

    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.textContent = "";
      for (let i = 0; i < 5; i++) {
        // Getting only 5 synonyms
        let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]}</span>`;
        // The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
  }
};

// Listen to the "keyup" event
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    // Function fetchAPI call
    fetchAPI(e.target.value);
  }
});

// Listen to the "click" event
removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  // The HTMLElement.focus() method sets focus on the specified element, if it can be focused. The focused element is the element that will receive keyboard and similar events by default.
  searchInput.focus();
  container.classList.remove("active");
  infoText.style.color = "#9a9a9a";
  infoText.textContent = `Type a word and press enter !`;
});
