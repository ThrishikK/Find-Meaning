const paraTemplate = function (definition, index) {
  // console.log(definition);
  return ` <p class='mb-2'>
           ${index + 1}) ${definition}
          </p>`;
};

const partsOfSpeechTemplate = function (p_o_s) {
  if (!p_o_s) return null;
  return ` <p style="font-style: italic;">
           ${p_o_s}
          </p>`;
};

const wordMeaningTemplate = function (givenWord, partsOfSpeech, defsArray) {
  return ` <div class="col-12 col-md-6 col-lg-3  rounded shadow m-2 mx-3 p-3">
          <h2 class="text-capitalize">${givenWord}</h2>
          ${partsOfSpeechTemplate(partsOfSpeech)}
          ${defsArray
            .map((eachDefinition, index) => {
              return paraTemplate(eachDefinition, index);
            })
            .join("")}         
        </div>`;
};

const meaningLessWordTemplate = function (givenWord) {
  return ` <div class="col-12   rounded shadow m-2 mx-3 p-3">
          <h2 class="text-capitalize">${givenWord}</h2>
          <p>Please Check the spelling of your word ${givenWord}.</p>        
        </div>`;
};

const loadingTemplate = function () {
  return `<div class="col-12 col-md-6 col-lg-4 border border-primary" id='spinnerElement'>
          <div
            style="height: 136px"
            class="d-flex flex-row justify-content-center align-items-center"
          >
            <div class="spinner-border text-primary" role="status"></div>
          </div>
        </div>`;
};

const saveWordTemplate = (word) => {
  return ` 
          <button class="btn btn-primary text-capitalize" data-text="${word}">${word}</button>`;
};

const wordHeadTemplate = (word) => {
  return `
  <div
        class="row mt-3 align-middle d-flex justify-content-around"
        id="mainRow"
      >
        <div class="d-flex flex-row justify-content-around align-items-center">
          <h2 class="text-capitalize" id="wordHead">${word}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-bookmark"
            viewBox="0 0 16 16"
            id="saveIcon"
            style="cursor: pointer"
          >
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"
            />
          </svg>
        </div>
      </div>
  `;
};

export {
  wordMeaningTemplate,
  loadingTemplate,
  meaningLessWordTemplate,
  saveWordTemplate,
  wordHeadTemplate,
};
