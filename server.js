// Configurar variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Importar Express y MongoDB
import express from "express";
import connectDB from "./config/db.js";
import saludo from "./api/v1/saludo.js";
import obtenerUsuarios from "./api/v1/usuarios.js";
import login from "./api/v1/login.js";
import verificarToken from "./middleware/auth.js";

// Importar Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

// Conectar a MongoDB
connectDB();

// Crear la aplicación Express
const app = express();

// Definir el puerto (Vercel usa process.env.PORT)
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta de prueba
 *     description: Verifica que el servidor esté funcionando correctamente
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Servidor funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: El servidor funciona correctamente
 */
// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "El servidor funciona correctamente" });
});

/**
 * @swagger
 * /api/v1/hola:
 *   get:
 *     summary: Mensaje de bienvenida
 *     description: Devuelve un mensaje de bienvenida desde variable de entorno
 *     tags: [API v1]
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: ¡Bienvenido!
 */
// Ruta API v1 - Hola
app.get("/api/v1/hola", async (req, res) => {
  const respuesta = await import("./api/v1/hola.js");
  res.json(respuesta.default);
});

/**
 * @swagger
 * /api/v1/saludo:
 *   get:
 *     summary: Saludo personalizado
 *     description: Devuelve un saludo personalizado con el nombre proporcionado
 *     tags: [API v1]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre para personalizar el saludo
 *         example: Ana
 *     responses:
 *       200:
 *         description: Saludo exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Hola, Ana!
 *       400:
 *         description: Parámetro nombre no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parámetro 'nombre' es requerido
 */
// Ruta API v1 - Saludo (con el parámetro nombre)
app.get("/api/v1/saludo", (req, res) => {
  const nombre = req.query.nombre;

  // Validar que el parámetro nombre existe y no está vacío
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      error: "Parámetro 'nombre' es requerido",
    });
  }

  const respuesta = saludo(nombre);
  res.json(respuesta);
});

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión (Autenticación)
 *     description: Genera un token JWT si las credenciales son correctas
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Credenciales no proporcionadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username y password son requeridos
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Credenciales inválidas
 */
// Ruta API v1 - Login (genera token JWT)
app.post("/api/v1/login", (req, res) => {
  const { username, password } = req.body;

  // Validar que se enviaron las credenciales
  if (!username || !password) {
    return res.status(400).json({
      error: "Username y password son requeridos"
    });
  }

  const resultado = login(username, password);

  if (!resultado.success) {
    return res.status(401).json({
      error: resultado.error
    });
  }

  res.json(resultado);
});

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve la lista de usuarios desde MongoDB (ruta protegida - requiere JWT)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 507f1f77bcf86cd799439011
 *                       nombre:
 *                         type: string
 *                         example: Ana
 *                       email:
 *                         type: string
 *                         example: ana@example.com
 *                       edad:
 *                         type: number
 *                         example: 25
 *                       activo:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Token no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado. Token no proporcionado.
 *       403:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token inválido o expirado
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener usuarios
 */
// Ruta API v1 - Usuarios (PROTEGIDA - requiere token JWT)
app.get("/api/v1/usuarios", verificarToken, async (req, res) => {
  try {
    const resultado = await obtenerUsuarios();
    
    if (!resultado.success) {
      return res.status(500).json({
        error: "Error al obtener usuarios",
        detalle: resultado.error
      });
    }
    
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalle: error.message
    });
  }
});

// Exportar la app para Vercel
export default app;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
