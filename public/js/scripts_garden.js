async function projectFunction(event) {
    event.preventDefault();

    const col1 = document.getElementById('col1').checked;
    const col2 = document.getElementById('col2').checked;
    const col3 = document.getElementById('col3').checked;
    const col4 = document.getElementById('col4').checked;

    const response = await fetch('/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            garden_name: col1,
            garden_loc: col2,
            soil_type: col3,
            garden_size: col4
        })
    });

    const result = await response.json();

    // Generate table based on selected columns
    if (result.success) {
        generateTable(result.data, col1, col2, col3, col4);
    } else {
        console.error("Error fetching data:", result.message);
    }
}

function generateTable(data, col1, col2, col3, col4) {
    let tableHtml = '<table class="table table-hover" border="1"><tr>';

    if (col1) tableHtml += '<th>Garden Name</th>';
    if (col2) tableHtml += '<th>Location</th>';
    if (col3) tableHtml += '<th>Soil Type</th>';
    if (col4) tableHtml += '<th>Garden Size</th>';

    tableHtml += '</tr>';

    data.forEach(row => {
        tableHtml += '<tr>';
        let cellIndex = 0;
        if (col1) tableHtml += `<td>${row[cellIndex++]}</td>`;
        if (col2) tableHtml += `<td>${row[cellIndex++]}</td>`;
        if (col3) tableHtml += `<td>${row[cellIndex++]}</td>`;
        if (col4) tableHtml += `<td>${row[cellIndex++]}</td>`;
        tableHtml += '</tr>';
    });

    tableHtml += '</table>';

    document.getElementById('tableContainer').innerHTML = tableHtml;
}

window.onload = function () {
    document.getElementById("project").addEventListener("submit", projectFunction);
};

