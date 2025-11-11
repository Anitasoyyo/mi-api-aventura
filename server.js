// Importar Express
const express = require("express");

// Crear la aplicación Express
const app = express();

// Definir el puerto
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "El servidor funciona correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
