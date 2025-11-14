// Configuración de Swagger para documentación de la API
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API Aventura",
      version: "1.0.0",
      description: "API RESTful con Express, MongoDB y JWT",
      contact: {
        name: "Proyecto de práctica - Módulo 7",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
      {
        url: "https://mi-api-aventura-sigma.vercel.app",
        description: "Servidor en Vercel",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Ingresa el token JWT obtenido del endpoint /api/v1/login",
        },
      },
    },
  },
  apis: ["./server.js"], // Archivos donde están los comentarios de documentación
};

export default swaggerJsdoc(options);
