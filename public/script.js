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

document.getElementById('descargarExcel').addEventListener('click', async function() {
    // Obtener los datos de la tabla
    const tabla = document.getElementById('dataTable');
    const filas = tabla.querySelectorAll('tbody tr');
    const datos = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        const filaDatos = Array.from(celdas).map(celda => celda.textContent);
        datos.push(filaDatos);
    });

    // Enviar los datos al backend
    try {
        const response = await fetch('https://minuta-l03d.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (response.ok) {
            // Descargar el archivo Excel
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'NuevoExcel.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error al generar el archivo Excel');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});