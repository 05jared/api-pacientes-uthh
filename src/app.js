import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pacientesRoutes from './routes/pacientes.routes.js';
import consultasRoutes from './routes/consultas.routes.js';
import diagnosticoRoutes from './routes/diagnostico.routes.js';
import tratamientoRoutes from './routes/tratamiento.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import noticiasRoutes from './routes/noticias.routes.js';
import tipopacientesRoutes from './routes/tipopacientes.routes.js';
import logEliminacionesRoutes from './routes/log_eliminaciones.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacientesRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/api/diagnostico', diagnosticoRoutes);
app.use('/api/tratamiento', tratamientoRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/tipopacientes', tipopacientesRoutes);
app.use('/api/logs', logEliminacionesRoutes);

app.get('/', (req, res) => {
  res.send('API De Pacientes UTHH h');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});