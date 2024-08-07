// Fetches data from the housepeople table and displays it.
async function fetchAndDisplayHousePeople() {
    const tableElement = document.getElementById('housepeople');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/housepeople', {
        method: 'GET'
    });

    const responseData = await response.json();
    const housepeopleContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    housepeopleContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayDivision(event) {
    event.preventDefault();
    const username = document.getElementById('inputUsername').value;

    const response = await fetch('/division', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('divisionMsg');

    const tableElement = document.getElementById('divisiontable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {

        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success col-4";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Found User!";
        messageElement.appendChild(alertDiv);

        const divisionContent = responseData.data;

        divisionContent.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {

        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger col-4";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Error finding data!";
        messageElement.appendChild(alertDiv);

    }
}

// Fetches data from the garden table and displays it.
async function fetchAndDisplayGarden() {
    const tableElement = document.getElementById('garden');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/garden', {
        method: 'GET'
    });

    const responseData = await response.json();
    const housepeopleContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    housepeopleContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the housepeople table and displays it.
async function fetchAndDisplayHousePeople() {
    const tableElement = document.getElementById('housepeople');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/housepeople', {
        method: 'GET'
    });

    const responseData = await response.json();
    const housepeopleContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    housepeopleContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the WorksOn table and displays it.
async function fetchAndDisplayWorksOn() {
    const tableElement = document.getElementById('workson');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/workson', {
        method: 'GET'
    });

    const responseData = await response.json();
    const housepeopleContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    housepeopleContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function () {
    // checkDbConnection();
    fetchTableData();
    document.getElementById("selectUser").addEventListener("submit", fetchAndDisplayDivision);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayGarden();
    fetchAndDisplayWorksOn();
    fetchAndDisplayHousePeople();
}
