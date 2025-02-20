document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const puesto = document.getElementById('puesto').value;
    const empresa = document.getElementById('empresa').value;

    // Crea una nueva fila en la tabla
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${puesto}</td>
        <td>${empresa}</td>
    `;

    tableBody.appendChild(newRow);

    // Limpia el formulario
    document.getElementById('dataForm').reset();
});