// Lógica para obtener usuarios de MongoDB
import Usuario from '../../modelo/Usuario.js';

export default async function obtenerUsuarios() {
  try {
    const usuarios = await Usuario.find();
    return {
      success: true,
      count: usuarios.length,
      data: usuarios
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
