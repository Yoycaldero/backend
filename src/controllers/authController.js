import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const register = async (req, res) => {
  const { username, password, nombre, apellido, email, numero } = req.body;

  try {
    const user = new User({ username, password, nombre, apellido, email, numero });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generar JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Obtener todos los datos del usuario (excepto la contraseña)
    const userData = {
      _id: user._id,
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      numero: user.numero,
    };

    // Enviar el token y los datos del usuario
    res.json({ token, user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener el perfil del usuario
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};