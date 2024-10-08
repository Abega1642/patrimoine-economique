import express from 'express';
import cors from 'cors';
import getAllPossessions from './getAllPossessions.js';
import { readFile, writeFile } from '../data/index.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/possession', async (req, res) => {
  try {
    const possessions = await getAllPossessions()
    res.status(200).json(possessions);
  } catch (err) {
    res.status(500).json({ status: "Possessions retrievement failed.", error: err.message });
  }
});

app.post('/possession', async (req, res) => {
  try {
      const newPossession = req.body;
      const data = await readFile('../data/data.json');
      const possessions = data.data[1].data.possessions;
      possessions.push(newPossession);

      await writeFile('../data/data.json', data.data);

      res.status(201).json({ message: "Possession ajoutée avec succès", possession: newPossession });
  } catch (error) {
    res.status(500).json({ status: "Possessions creation failed.", error: error.message });
  }
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
