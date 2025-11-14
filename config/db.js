// Configuración de la conexión a MongoDB
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar MongoDB: ${error.message}`);
    // No usar process.exit(1) en producción (Vercel)
    // Solo lanzar el error para manejarlo en las rutas
    throw error;
  }
};

export default connectDB;
