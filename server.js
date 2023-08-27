// server.js
// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Agrega esta línea

const app = express();
const port = 3000;

app.use(cors()); // Usa el middleware cors


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabasesang',
    port:3306,
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

app.use(express.json());

app.post('/agregar-tarea', (req, res) => {
    const taskText = req.body.taskText;
    const query = 'INSERT INTO tasks (task_text) VALUES (?)';

    db.query(query, [taskText], (err, result) => {
        if (err) {
            console.error('Error al agregar tarea:', err);
            res.status(500).json({ error: 'Error al agregar tarea' });
            return;
        }
        res.json({ message: 'Tarea agregada exitosamente' });
    });
});

app.put('/editar-tarea/:id', (req, res) => {
    const taskId = req.params.id;
    const newTaskText = req.body.newTaskText;

    const query = 'UPDATE tasks SET task_text = ? WHERE id = ?';

    db.query(query, [newTaskText, taskId], (err, result) => {
        if (err) {
            console.error('Error al editar tarea:', err);
            res.status(500).json({ error: 'Error al editar tarea' });
            return;
        }
        res.json({ message: 'Tarea editada exitosamente' });
    });
});

app.delete('/eliminar-tarea/:id', (req, res) => {
    const taskId = req.params.id;

    const query = 'DELETE FROM tasks WHERE id = ?';

    db.query(query, [taskId], (err, result) => {
        if (err) {
            console.error('Error al eliminar tarea:', err);
            res.status(500).json({ error: 'Error al eliminar tarea' });
            return;
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    });
});

app.get('/obtener-tareas', (req, res) => {
    const query = 'SELECT * FROM tasks';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener tareas:', err);
            res.status(500).json({ error: 'Error al obtener tareas' });
            return;
        }
        res.json(results);
    });
});


// Agrega las rutas para actualizar y eliminar tareas aquí

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
