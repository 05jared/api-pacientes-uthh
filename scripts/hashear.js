import bcrypt from 'bcryptjs';
import db from '../src/config/db.js';

const usuarios = [
  { id: 1, contrasena: 'jared123' },
  { id: 4, contrasena: '12345' },
  { id: 6, contrasena: '123456789' },
  { id: 7, contrasena: '777' },
  { id: 8, contrasena: 'omar123' },
  { id: 9, contrasena: 'uriel123' },
];

for (const u of usuarios) {
  const hash = await bcrypt.hash(u.contrasena, 10);
  await db.query('UPDATE usuarios SET contrasena=? WHERE id_usuarios=?', [hash, u.id]);
  console.log(`✅ Usuario ${u.id} hasheado`);
}

console.log('¡Listo! Todas las contraseñas hasheadas.');
process.exit();