const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para generar el Excel
app.post('/generar-excel', (req, res) => {
    const datos = req.body; // Datos de la tabla enviados desde el frontend

    // Cargar la plantilla
    const plantillaPath = path.join(__dirname, 'Plantilla.xlsx');
    const workbook = xlsx.readFile(plantillaPath);

    // Obtener la hoja "Hoja2"
    const hoja2 = workbook.Sheets['Hoja2'];

    // Insertar los datos en la tabla "Tabla1"
    const tabla1Range = xlsx.utils.decode_range(hoja2['!ref']);
    const filaInicio = tabla1Range.s.r + 1; // Fila donde empieza la tabla
    const columnaInicio = tabla1Range.s.c; // Columna donde empieza la tabla

    datos.forEach((fila, i) => {
        fila.forEach((valor, j) => {
            const celda = xlsx.utils.encode_cell({ r: filaInicio + i, c: columnaInicio + j });
            hoja2[celda] = { v: valor, t: 's' }; // Insertar valor en la celda
        });
    });

    // Generar el archivo Excel
    const nuevoExcelPath = path.join(__dirname, 'NuevoExcel.xlsx');
    xlsx.writeFile(workbook, nuevoExcelPath);

    // Enviar el archivo para descargar
    res.download(nuevoExcelPath, 'NuevoExcel.xlsx', (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al generar el archivo Excel');
        }
    });
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});