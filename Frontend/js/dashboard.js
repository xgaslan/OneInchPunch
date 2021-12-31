window.onload = () => {
    let checkIsLogin = localStorage.getItem("is_login");
    if ((checkIsLogin !== null) & (checkIsLogin !== "true")) {
        window.location.replace(
            "file:///C:/Users/10010421/Documents/Projects/OneInchPunchFrontend/index.html"
        );
    }
    getDepartments();
};

let firstName = localStorage.getItem("name");
let lastName = localStorage.getItem("last_name");
let welcome = (document.getElementById(
    "welcome"
).innerHTML = `Hoşgeldin, ${firstName} ${lastName}`);

const getDepartments = async () => {
    let url = "https://localhost:44320/api/Deparment";
    console.log("getDepartments çalıştı" + "");
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
    })
        .then((response) => {
            const res = response.json();
            res.then((data) => {
                createTableFromJSON(data);
            });
        })
        .catch((err) => alert("Fetch isteğinde hata oluştu."));
};

const createTableFromJSON = (tableData) => {
    console.log(tableData);
    let columns = [];

    for (let index = 0; index < tableData.length; index++) {
        for (let key in tableData[index]) {
            if (columns.indexOf(key) === -1) {
                columns.push(key);
            }
        }
    }

    let table = document.createElement("table");
    table.setAttribute("id", "tableId");
    table.setAttribute("class", "table");

    let tr = table.insertRow(-1);

    for (let index = 0; index < columns.length; index++) {
        let th = document.createElement("th");
        th.innerHTML = columns[index];
        tr.appendChild(th);
    }

    for (let index = 0; index < tableData.length; index++) {
        tr = table.insertRow(-1);
        for (let value = 0; value < columns.length; value++) {
            let tableCell = tr.insertCell(-1);
            tableCell.innerHTML = tableData[index][columns[value]];
        }
    }

    let showData = document.getElementById("container");
    showData.appendChild(table);
};
