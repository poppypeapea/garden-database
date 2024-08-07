/**
 * ALL FUNCTIONALITIES RELATED TO WATERING
 */
// Fetches data from joined WateringR1 and WateringR2 table and displays it.
async function fetchAndDisplayWatering() {
    const tableElement = document.getElementById('watering');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/watering', {
        method: 'GET'
    });

    const responseData = await response.json();
    const wateringContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    wateringContent.forEach(watering => {
        const row = tableBody.insertRow();
        watering.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
// Fetches data from WateringR2 and displays it
async function fetchAndDisplayWateringR2() {
    const tableElement = document.getElementById('wateringR2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/wateringR2', {
        method: 'GET'
    });

    const responseData = await response.json();
    const wateringR2Content = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    wateringR2Content.forEach(wateringR2 => {
        const row = tableBody.insertRow();
        wateringR2.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
// Fetches data from WateringR1 and displays it
async function fetchAndDisplayWateringR1() {
    const tableElement = document.getElementById('wateringR1');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/wateringR1', {
        method: 'GET'
    });

    const responseData = await response.json();
    const wateringR1Content = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    wateringR1Content.forEach(wateringR1 => {
        const row = tableBody.insertRow();
        wateringR1.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        })
    })
}
// Insert watering entry into WateringR2 and WateringR1 tables
async function insertWatering(event) {
    event.preventDefault();

    const wateringId = document.getElementById('insertwateringId').value;
    const pH = document.getElementById('insertpH').value;
    const temperature = document.getElementById('inserttemperature').value;
    const wateringDate = document.getElementById('insertwateringDate').value;
    const amount = document.getElementById('insertamount').value;
    const plantId = document.getElementById('insertplantId').value;

    const response = await fetch('/insertWatering', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            wateringId: wateringId,
            pH: pH,
            temperature: temperature,
            wateringDate: wateringDate,
            amount: amount,
            plantId: plantId
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertWateringResultMsg');

    if (responseData.success) {
        
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Data inserted successfully!";
        messageElement.appendChild(alertDiv);
        fetchTableData();
    } else {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Error inserting data!";
        messageElement.appendChild(alertDiv);
    }
}
// Delete watering entry through cascading of WateringR1 table
async function deleteWatering(event) {
    event.preventDefault();

    const wateringDate = document.getElementById('deletewateringDate').value;
    const temperature = document.getElementById('deletetemperature').value;
    const pH = document.getElementById('deletepH').value;

    const response = await fetch('/deleteWatering', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            wateringDate: wateringDate,
            temperature: temperature,
            pH: pH
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteWateringR1ResultMsg');

    if (responseData.success) {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Data deleted successfully!";
        messageElement.appendChild(alertDiv);
        fetchTableData();
    } else {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Error deleting data!";
        messageElement.appendChild(alertDiv);
    }
}
// Update WateringR2 entry
async function updateWateringR2(event) {
    event.preventDefault();

    const wateringId = document.getElementById('updatewateringId').value;
    const wateringDate = document.getElementById('updatewateringDate').value;
    const temperature = document.getElementById('updatetemperature').value;
    const pH = document.getElementById('updatepH').value;
    const plantId = document.getElementById('updateplantId').value;

    const response = await fetch('/updateWateringR2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            wateringId: wateringId,
            wateringDate: wateringDate,
            temperature: temperature,
            pH: pH,
            plantId: plantId
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateWateringR2ResultMsg');

    if (responseData.success) {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Data updated successfully!";
        messageElement.appendChild(alertDiv);
        fetchTableData();
    } else {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Error updating data!";
        messageElement.appendChild(alertDiv);
    }
}
// GroupBy on WateringR2 entry
async function groupByWateringR2(event) {
    event.preventDefault();

    const tableElement = document.getElementById('wateringR2GroupBy');
    const tableBody = tableElement.querySelector('tbody');

    const orderBy = document.getElementById('orderwateringR2').value;

    const response = await fetch('/groupbywateringR2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderBy: orderBy
        })
    });

    const responseData = await response.json();
    const wateringGroupByContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    wateringGroupByContent.forEach(entry => {
        const row = tableBody.insertRow();
        entry.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
// Having on WateringR2 entry
async function havingWateringR2(event) {
    event.preventDefault();

    const tableElement = document.getElementById('wateringR2Having');
    const tableBody = tableElement.querySelector('tbody');

    const havingQuery = document.getElementById('havingwateringR2').value;
    const numEntries = document.getElementById('havingwateringR2numentries').value;

    const response = await fetch('/havingWateringR2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            havingQuery: havingQuery,
            numEntries: numEntries
        })
    });

    const responseData = await response.json();
    const wateringHavingContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    wateringHavingContent.forEach(entry => {
        const row = tableBody.insertRow();
        entry.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
// Nested Aggregation for Watering R1 and R2 joined table
async function nestedAggregation(event) {
    event.preventDefault();

    const tableElement = document.getElementById('nestedaggregationtable');
    const tableBody = tableElement.querySelector('tbody');

    const query = document.getElementById('nestedaggregationdropdown').value;

    const response = await fetch('/nestedaggregation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('nestedaggregationMsg');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success col-6 ";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Successful data aggregation!";
        messageElement.appendChild(alertDiv);

        const nestedaggregationContent = responseData.data;

        nestedaggregationContent.forEach(content => {
            const row = tableBody.insertRow();
            content.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error aggregating data!";
        messageElement.textContent = "";
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger col-6";
        alertDiv.setAttribute("role", "alert");
        alertDiv.textContent = "Error aggregating data!";
        messageElement.appendChild(alertDiv);
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function () {
    // GARDEN RELATED FUNCTIONS
    fetchTableData();
    document.getElementById("insertWatering").addEventListener("submit", insertWatering);
    document.getElementById("deleteWateringR1").addEventListener("submit", deleteWatering);
    document.getElementById("updateWateringR2").addEventListener("submit", updateWateringR2);
    document.getElementById("groupbywateringR2").addEventListener("submit", groupByWateringR2);
    document.getElementById("havingwateringR2Form").addEventListener("submit", havingWateringR2);
    document.getElementById("nestedaggregation").addEventListener("submit", nestedAggregation);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    // GARDEN RELATED FUNCTIONS
    fetchAndDisplayWatering();
    fetchAndDisplayWateringR2();
    fetchAndDisplayWateringR1();
}
