import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import 'dotenv/config';

const app = express();

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verifica la conexión a la base de datos al iniciar el servidor
pool.connect()
  .then(client => {
    console.log('Conexión a PostgreSQL exitosa');
    client.release();
  })
  .catch(err => {
    console.error('Error al conectar a PostgreSQL:', err);
  });

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/api/hello', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Hola desde el backend!', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Endpoint para listar tablas y columnas
app.get('/api/tables', async (req, res) => {
    try {
    const query = `
      SELECT * FROM "VideoRender"
      ORDER BY "createdAt" DESC
    `;
    const { rows } = await pool.query(query);
    //console.log('Tabla consultada: VideoRender');
    //console.log('Datos obtenidos:', rows);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener videos' });
  }
});

const port = process.env.PORT || 4000;
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});