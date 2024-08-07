async function fetchAndDisplayPlant() {
    const tableElement = document.getElementById('plantTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/plant', {
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

window.onload = function () {
    // checkDbConnection();
    fetchTableData();
}

function fetchTableData() {
    fetchAndDisplayPlant();
}
