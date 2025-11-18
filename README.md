# Mi API Aventura

Proyecto de práctica para aprender sobre:

- **Despliegue en Vercel y en Netflify**:
- **Servidor con Express**: Creación de un servidor backend utilizando Express.js
- **Personalización de package.json**: Configuración manual del archivo package.json con campos personalizados
- **Control de versiones con GitHub**: Gestión del código fuente en GitHub
- **Variables de entorno**: Manejo seguro de configuraciones con dotenv
- **MongoDB Atlas + Mongoose**: Base de datos NoSQL en la nube
- **Manejo de errores**: Validación de parámetros y códigos de estado HTTP
- **Autenticación JWT**: Protección de rutas con JSON Web Tokens
- **Documentación con Swagger**: Documentación interactiva de la API

## Descripción

API RESTful desarrollada con Node.js y Express que implementa:

- Versionado de endpoints (v1)
- Variables de entorno
- Conexión a MongoDB Atlas con Mongoose
- Validación y manejo de errores
- Autenticación con JWT (JSON Web Tokens)
- Rutas protegidas con middleware
- Documentación interactiva con Swagger UI
- Desplegada en Vercel y Netlify

## URLs

**API en Vercel:** https://mi-api-aventura-sigma.vercel.app

**API en Netlify:** https://glittering-bavarois-f04d99.netlify.app

**Documentación Swagger:** http://localhost:3000/api-docs

## Estructura del Proyecto

```
mi-api-aventura/
├── api/
│   └── v1/
│       ├── hola.js          # Endpoint con variable de entorno
│       ├── saludo.js        # Endpoint con parámetros
│       ├── login.js         # Endpoint que genera JWT
│       └── usuarios.js      # Endpoint protegido con MongoDB
├── config/
│   └── db.js                # Configuración MongoDB
├── middleware/
│   └── auth.js              # Middleware verificación JWT
├── modelo/
│   └── Usuario.js           # Modelo/Schema de Usuario
├── imagenes/
│   └── EstructuraExpress.png
├── .env                     # Variables de entorno (no se sube a git)
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore
├── server.js                # Servidor principal
├── package.json
├── vercel.json              # Configuración de Vercel
└── README.md
```

## Endpoints Disponibles

### GET /

Ruta de prueba

```json
{
  "mensaje": "El servidor funciona correctamente"
}
```

### GET /api/v1/hola

Mensaje de bienvenida desde variable de entorno

```json
{
  "mensaje": "¡Bienvenido!"
}
```

### GET /api/v1/saludo?nombre=TuNombre

Saludo personalizado con parámetro obligatorio

- **Parámetro requerido:** `nombre` (query string)
- **Respuesta exitosa (200):**

```json
{
  "mensaje": "Hola, TuNombre!"
}
```

- **Error sin parámetro (400):**

```json
{
  "error": "Parámetro 'nombre' es requerido"
}
```

### GET /api/v1/usuarios

**Ruta protegida - Requiere autenticación JWT**

Obtiene la lista de usuarios desde MongoDB

- **Headers requeridos:**

```
Authorization: Bearer <tu_token_jwt>
```

- **Respuesta exitosa (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "nombre": "Ana",
      "email": "ana@example.com",
      "edad": 25,
      "activo": true
    }
  ]
}
```

- **Error sin token o token inválido (401/403):**

```json
{
  "error": "No se proporcionó token"
}
```

- **Error (500):**

```json
{
  "error": "Error al obtener usuarios",
  "detalle": "mensaje de error"
}
```

### POST /api/v1/login

Genera un token JWT para autenticación

- **Body (JSON):**

```json
{
  "usuario": "nombre_usuario",
  "password": "contraseña_usuario"
}
```

- **Respuesta exitosa (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiraEn": "24h"
}
```

- **Error credenciales inválidas (401):**

```json
{
  "error": "Credenciales inválidas"
}
```

**Nota:** Los usuarios de prueba están definidos en `api/v1/login.js`

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Anitasoyyo/mi-api-aventura.git
```

2. Navega al directorio del proyecto:

```bash
cd mi-api-aventura
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura las variables de entorno:

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y añade tus valores:
# - MENSAJE_BIENVENIDA: Tu mensaje personalizado
# - MONGODB_URI: Tu URL de conexión a MongoDB Atlas
# - JWT_SECRET: Clave secreta para firmar los tokens JWT
```

## Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
   (¿Qué es un cluster? Es un conjunto de servidores que trabajan juntos para almacenar y gestionar tu base de datos)
3. En "Database Access", crea un usuario con contraseña
4. En "Network Access", añade tu IP (o 0.0.0.0/0 para desarrollo)
5. Haz clic en "Connect" → "Connect your application"
6. Copia la URL de conexión y pégala en tu archivo `.env`
7. Reemplaza `<password>` con tu contraseña real
8. Reemplaza `<dbname>` con el nombre de tu base de datos (ej: `mi-api`)

## Uso

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript
- **Express.js**: Framework web minimalista para Node.js
- **MongoDB Atlas**: Base de datos NoSQL en la nube
- **Mongoose**: ODM (Object Data Modeling) para MongoDB
- **jsonwebtoken**: Implementación de JSON Web Tokens para autenticación
- **dotenv**: Manejo de variables de entorno
- **Vercel**: Plataforma de despliegue serverless

## Variables de Entorno

Este proyecto utiliza las siguientes variables de entorno:

| Variable             | Descripción                              | Ejemplo                               |
| -------------------- | ---------------------------------------- | ------------------------------------- |
| `MENSAJE_BIENVENIDA` | Mensaje personalizado del endpoint /hola | `"¡Bienvenido!"`                      |
| `MONGODB_URI`        | URL de conexión a MongoDB Atlas          | Obtener desde MongoDB Atlas Dashboard |
| `JWT_SECRET`         | Clave secreta para firmar tokens JWT     | Genera con: `openssl rand -hex 32`    |
| `PORT`               | Puerto del servidor (opcional)           | `3000`                                |

## Despliegue en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en Settings → Environment Variables
3. Añade `MENSAJE_BIENVENIDA`, `MONGODB_URI` y `JWT_SECRET`
4. Vercel desplegará automáticamente cada push a la rama main

## Documentación de la API (Swagger)

Este proyecto incluye **documentación interactiva** generada con Swagger UI.

### Acceder a la documentación:

**Desarrollo local:**

1. Inicia el servidor: `npm start`
2. Abre en tu navegador: `http://localhost:3000/api-docs`

**Características de la documentación:**

- 📖 Descripción detallada de todos los endpoints
- 🧪 Interfaz para probar los endpoints directamente
- 🔒 Soporte para autenticación JWT
- 📝 Ejemplos de request y response
- ✅ Códigos de estado HTTP explicados

### Cómo probar endpoints protegidos en Swagger:

1. Haz clic en **POST /api/v1/login**
2. Haz clic en "Try it out"
3. Ingresa credenciales de prueba (ver archivo `api/v1/login.js`)
4. Copia el token de la respuesta
5. Haz clic en el botón **"Authorize"** (🔒) en la parte superior
6. Pega el token y haz clic en "Authorize"
7. Ahora puedes probar endpoints protegidos como **GET /api/v1/usuarios**

## Autenticación JWT

Este proyecto implementa autenticación JWT en 3 pasos:

1. **`api/v1/login.js`** - Genera el token JWT si las credenciales son correctas
2. **`middleware/auth.js`** - Verifica que el token sea válido antes de acceder a rutas protegidas
3. **`server.js`** - Define los endpoints:
   - `POST /api/v1/login` → Crea el token
   - `GET /api/v1/usuarios` → Ruta protegida que usa `verificarToken` como middleware

**Nota:** Consulta el archivo `api/v1/login.js` para ver los usuarios de prueba disponibles.

## Documentación Adicional

- **[APUNTES.md](APUNTES.md)**: Notas de aprendizaje sobre Mongoose, MongoDB y arquitectura del proyecto.
  También incluyo imágenes que explican de manera intuitiva la estructura que he seguido para crear diferentes partes del proyecto.
  https://www.netlify.com/support/
