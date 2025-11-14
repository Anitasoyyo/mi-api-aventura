// Modelo de Usuario para MongoDB
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  edad: {
    type: Number,
    min: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
