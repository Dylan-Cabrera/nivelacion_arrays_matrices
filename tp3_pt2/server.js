const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Objeto para almacenar alumnos separados por dirección IP
// Formato: { "192.168.0.5": [{nombre, edad, nota}], "192.168.0.8": [...] }
const alumnosPorIP = {};

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set trust proxy config in case the server is placed behind a proxy/ngrok
app.set('trust proxy', true);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Helper function to extract user identifier (their device IP)
const getDeviceID = (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
};

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para traer los alumnos registrados desde ESA IP específica
app.get('/alumnos', (req, res) => {
    const ip = getDeviceID(req);
    // Retornamos el array de alumnos de esa IP o un array vacío si no hay ninguno
    const alumnosDeEstaIP = alumnosPorIP[ip] || [];
    res.json(alumnosDeEstaIP);
});

// Endpoint para guardar a un nuevo alumno asociado a la IP que lo envía
app.post('/enviar', (req, res) => {
    const ip = getDeviceID(req);
    const { nombre, edad, nota } = req.body;

    // Si la IP todavía no existe en el objeto, la inicializamos
    if (!alumnosPorIP[ip]) {
        alumnosPorIP[ip] = [];
    }

    // Añadimos el nuevo alumno a la lista de esa IP
    alumnosPorIP[ip].push({ nombre, edad, nota });

    console.log(`Nuevo alumno guardado para IP ${ip}:`, req.body);

    // Respondemos con JSON ya que el frontend se comunica por fetch/ajax
    res.json({ success: true, message: 'Alumno guardado correctamente' });
});

// Configure server to listen on 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});