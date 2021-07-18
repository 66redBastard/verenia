const initialTextData =
  "цей текс редагуємий. вміщує поля для вводу {{input}}, а такоє поля які вміщують якусь інформацію {{input:кокойто великий текст}}, має область {{textarea}} без тексту та область {{textarea:кокойто текст, який может мати :двікрапки}} з іфнформацією";

const btnImport = $("#renderResult");
const textAreaImport = $("#mainTextArea");
const showResult = $("#showText");
const btnExport = $("#exportData");

function importText(text) {
  const regExInput = /{{input:[^}}]*}}/g;
  const regExTextArea = /{{textarea:[^}}]*}}/g;

  return text
    .replaceAll("{{input}}", "<input type='text'>")
    .replaceAll("{{textarea}}", "<textarea></textarea>")
    .replaceAll(regExInput, (value) => {
      const cutStart = "{{input:"; // detect which part to be cutted
      const startIndex = cutStart.length; // detect how many symbols to be cutted from the start of a string
      const endIndex = value.length - 2; // detect how many symbols to be cutted from the end of a string
      const cuttedString = value.substring(startIndex, endIndex); // .substring func that cuts input string
      return `<input type='text' value="${cuttedString}">`;
    })
    .replaceAll(regExTextArea, (value) => {
      const cutStart = "{{textarea:"; // same logic for the text area
      const startIndex = cutStart.length;
      const endIndex = value.length - 2;
      const cuttedString = value.substring(startIndex, endIndex);
      return `<textarea>${cuttedString}</textarea>`;
    });
}

function exportText(html) {
  const fullSentence = $(html)
    .clone() // create deep copy of the set of matched elements to avoid changes in the original string
    .children() // find all of input and textarea as children el in the $(html)
    .replaceWith(function () {
      // this function is replacing string with help of this keyword
      if (this instanceof HTMLInputElement) {
        return `{{input:${this.value}}}`;
      } else {
        return `{{textarea:${this.value}}}`;
      }
    })
    .end() //  ends the current oprations in the chain and returns the object to its state before
    .text(); // get the text of all children

  return fullSentence;
}

btnImport.click(() => {
  const textToImport = textAreaImport.val(); // get the value from textarea #mainTextArea
  const parsedText = importText(textToImport); // fires import function with param

  showResult.html(parsedText); // show <p> tag with imported text and ability to change text from input and textarea fields
});

btnExport.click(() => {
  const textToExport = showResult[0];
  const exportedRwsult = exportText(textToExport); // fires export text function with param to export back to the textarea #mainTextArea
  textAreaImport.val(exportedRwsult); // updates text afted input and textarea is changed by the user
});

textAreaImport.val(initialTextData); // show initial string in #mainTextArea
