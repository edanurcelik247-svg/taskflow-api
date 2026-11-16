const express = require('express');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API çalışıyor', endpoints: '/tasks' });
});

app.use('/tasks', taskRoutes);

// Bulunamayan adresler ve hatalar en sonda yakalanır
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TaskFlow API http://localhost:${PORT} adresinde çalışıyor`);
});
