
function getData() {
    let dateSelected = document.getElementById("date-input");
    let dateAsString = dateSelected.value;
    console.log(dateAsString);
    let outputArea = document.getElementById("output");
    let newPar = document.createElement("p");
    newPar.innerHTML = dateAsString;
    outputArea.append(newPar);
};


function otherFunction() {
    let item = document.getElementById("selectMe");
    item.innerHTML = "Not Data";
};
// document.getElementById("date-form").addEventListener("submit", getData);