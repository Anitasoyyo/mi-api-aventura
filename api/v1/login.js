// Generar token JWT
import jwt from "jsonwebtoken";

// Usuarios de prueba
const usuarios = [
  { username: "admin", password: "admin123" },
  { username: "usuario", password: "user123" },
];

export default function login(username, password) {
  // Verificar si el usuario existe
  const usuarioValido = usuarios.find(
    (u) => u.username === username && u.password === password
  );

  // Si no existe, devuelve error
  if (!usuarioValido) {
    return { success: false, error: "Credenciales inválidas" };
  }

  // Crear token JWT
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { success: true, token };
}
