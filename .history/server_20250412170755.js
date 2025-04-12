import express from 'express';
import connectDB from './config/db.js';

import Material from './models/Material.js';
import Device from './models/Device.js';
import Tool from './models/Tool.js';
import Food from './models/Food.js';
import Chemical from './models/Chemical.js';
import Experiment from './models/Experiment.js';
import ExperimentCost from './models/ExperimentCost.js';

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Lab Management API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));