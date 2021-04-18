let apiUrlTxData = "https://api.covidtracking.com/v2/states/tx/"
let jsonObj = {};

async function getData() {
    let dateSelected = {};
    dateSelected.date = document.getElementById("date-input").value;
    //month is created as a string in the format YYYY-MM-DD (ex. 2021-04-15)

    //make sure a date is selected
    if (!(Object.keys(dateSelected.date).length === 0)) {
        let dateAsString = dateSelected.date;
        let outputArea = document.getElementById("tableOutput");

        //once the json object resolves we can use it
        jsonObj = await getCovidData(apiUrlTxData, dateAsString);
        console.log(jsonObj);
        if (jsonObj.error) {
            return alert("There was an error while fetching the data for this date. Please check that you have selected a date on, or between, March 03, 2020 and March 07, 2021")
        }
        //remove the placeholder text if a table will get created.
        if (outputArea.innerHTML == "Your table will appear here.") {
            outputArea.innerHTML = "";
        }

        //make the dang table
        makeTable(jsonObj)
    } else {
        alert("Please select a date.")
    };


};

function getCovidData(apiUrl, dateString) {
    async function apiResponse(fullAPIurl) {
        const response = await fetch(fullAPIurl);
        let jsonResponse = response.json();
        // jsonObj = data;
        return jsonResponse;
    }

    let fullAPIurl = apiUrl + dateString + ".json";
    // console.log(fullAPIurl);
    return apiResponse(fullAPIurl);
}

function otherFunction() {
    let item = document.getElementById("selectMe");
    item.innerHTML = "Not Data";
};
// document.getElementById("date-form").addEventListener("submit", getData);

function makeTable(someJsonObj) {
    let jsonObj = someJsonObj;
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    //create a table
    let newTable = document.createElement("table");
    let outputArea = document.getElementById("tableOutput");
    // create table Caption
    let caption = newTable.createCaption();
    caption.textContent = `Total COVID case data for ${jsonObj.data.state} as of ${jsonObj.data.date}`;

    //create table Head
    function generateTableHead(table) {
        let headerNames = Object.keys(jsonObj.data.cases);
        let blankHeader = " ";
        //create space for row Header names
        headerNames.unshift(blankHeader);
        headerNames = headerNames.map(string => toTitleCase(string));
        let tHead = table.createTHead();
        let tHRow = tHead.insertRow();

        headerNames.forEach(element => {
            let th = document.createElement("th");
            let text = document.createTextNode(element);
            th.appendChild(text);
            tHRow.appendChild(th);
        });
    }

    // create Table Body
    function generateTableBody(table) {
        let columnNames = Object.keys(jsonObj.data.cases);
        let cellData = columnNames.map(dataName => {
            return jsonObj.data.cases[dataName].value;
        });
        console.log(cellData);
        let tBody = table.createTBody();
        let tRow = tBody.insertRow();
        cellData.forEach((dataValue, i) => {
            // on the first run create the header element from data key name
            if (i == 0) {
                let th = document.createElement("th");
                let text = document.createTextNode("Cases");
                th.appendChild(text);
                tRow.appendChild(th);
            }
            let newCell = tRow.insertCell();
            let newText = document.createTextNode(dataValue);
            newCell.append(newText);

        });
    }

    //add the table sections to DOM
    generateTableHead(newTable);
    generateTableBody(newTable);
    outputArea.append(newTable);

    console.log(jsonObj);
}

