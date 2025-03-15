import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    default: "", 
  },
  numero: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    default: "", // Opcional
  },
  fechaNacimiento: {
    type: Date,
    default: null, // Opcional
  },
});

// Hash de la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);