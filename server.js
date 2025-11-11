// Importar Express
const express = require("express");

// Crear la aplicación Express
const app = express();

// Definir el puerto (Vercel usa process.env.PORT)
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "El servidor funciona correctamente" });
});

// Ruta API v1 - Hola
app.get("/api/v1/hola", (req, res) => {
  const respuesta = require("./api/v1/hola");
  res.json(respuesta);
});

// Exportar la app para Vercel
module.exports = app;

// Iniciar el servidor solo si no está en Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}
