const initialTextData = "цей текс редагуємий. вміщує поля для вводу {{input}}, а такоє поля які вміщують якусь інформацію {{input:кокойто длинний текст}},содержт область {{textarea}} без тексту та  содержить область {{textarea:кокойто текст которий может мати двікрапки}} з іфнформацією"

const btnImport = $("#renderResult");
const textAreaImport = $("#mainTextArea")
const showResult = $("#showText");
const btnExport = $("#exportData");


function importText(text) {
    const regExInput = /{{input:[^}}]*}}/g;
    const regExTextArea = /{{textarea:[^}}]*}}/g;
   
    return text
        .replaceAll("{{input}}", "<input type='text'>")
        .replaceAll("{{textarea}}", "<textarea></textarea>")
        .replaceAll(regExInput, (value) => {
            const cutStart = "{{input:";
            const startIndex = cutStart.length;
            const endIndex = value.length - 2;
            const cuttedString = value.substring(startIndex, endIndex);
            return `<input type='text' value="${cuttedString}">`;
        })
        .replaceAll(regExTextArea, (value) => {
            const cutStart = "{{textarea:";
            const startIndex = cutStart.length;
            const endIndex = value.length - 2;
            const cuttedString = value.substring(startIndex, endIndex);
            return `<textarea>${cuttedString}</textarea>`;
        });
}

function exportText(html) {
    console.log(html);

    // const str = [...html.children].map(x => {
    //     if(x instanceof HTMLInputElement) {
    //        return `{{input:${x.value}}}`;
    //     } else {
    //         return `{{textarea: ${x.value}}}`;
    //     }
    // });

    const str = $(html).clone().children().replaceWith(function() {
        console.log(this)
        if(this instanceof HTMLInputElement) {
                return `{{input:${this.value}}}`;
            } else {
                return `{{textarea: ${this.value}}}`;
            }
        console.log(arguments)
    }).end().text();

    console.log(str);

    return str;
}

btnImport.click(() => {
    const textToImport = textAreaImport.val();
    const parsedText = importText(textToImport);

    showResult.html(parsedText);
})

btnExport.click(() => {
    const textToExport = showResult[0];
    const exportedRwsult = exportText(textToExport);
    textAreaImport.val(exportedRwsult);
})


textAreaImport.val(initialTextData);