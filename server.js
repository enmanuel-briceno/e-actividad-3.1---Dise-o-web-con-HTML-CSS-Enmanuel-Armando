const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la Base de Datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado exitosamente a SQLite.');
    }
});

// Crear tabla si no existe con los campos exactos de tu base de datos
db.run(`CREATE TABLE IF NOT EXISTS inscripciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    curso TEXT,
    comentario TEXT,
    fecha TEXT
)`);

// Endpoint POST para guardar los registros de los fanáticos de la LVBP
app.post('/api/inscribir', (req, res) => {
    const { nombre, email, curso, comentario } = req.body;
    const fecha = new Date().toISOString().split('T')[0]; // Genera la fecha actual YYYY-MM-DD

    const query = `INSERT INTO inscripciones (nombre, email, curso, comentario, fecha) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [nombre, email, curso, comentario, fecha], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error al insertar en la base de datos' });
        }
        res.json({ message: 'Inscripción guardada exitosamente', id: this.lastID });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});