// Configurar variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importar Express
import express from "express";

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
app.get("/api/v1/hola", async (req, res) => {
  const respuesta = await import("./api/v1/hola.js");
  res.json(respuesta.default);
});

// Exportar la app para Vercel
export default app;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
