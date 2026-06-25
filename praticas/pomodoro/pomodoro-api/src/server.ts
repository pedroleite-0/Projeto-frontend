import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes';
import settingsRoutes from './routes/settings.routes'; // Vamos criar essa logo abaixo

const app = express();
const PORT = 3333; // O professor exigiu a porta 3333 no Postman!

app.use(cors());
app.use(express.json());

// 2.1 Health Check (Exatamente como o Postman espera)
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use(tasksRoutes);
app.use(settingsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} - Atividade 2 (Padrão Postman) Pronta!`);
});
