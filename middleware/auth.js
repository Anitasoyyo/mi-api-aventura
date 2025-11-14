// Middleware para verificar JWT
// Este archivo lo que hace es revisar si traes un TOKEN válido antes de dejarte pasar
import jwt from "jsonwebtoken";

export default function verificarToken(req, res, next) {
  // Obtener token del header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Acceso denegado. Token no proporcionado.",
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Guardar datos del usuario en la request
    next(); // Continuar a la siguiente función
  } catch (error) {
    return res.status(403).json({
      error: "Token inválido o expirado",
    });
  }
}
