import express from 'express';
import Material from '../models/Material.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Material.find();
  res.json(items);
});

router.post('/', async (req, res) => {
    try {
      const { name, cost, description, quantity, type, ...rest } = req.body;
  
      if (!['Device', 'Tool', 'Chemical', 'Food'].includes(type)) {
        return res.status(400).json({ message: 'Invalid material type' });
      }
  
      // تحقق من الحقول الخاصة حسب النوع
      switch (type) {
        case 'Device':
          if (!rest.model || !rest.manufacturer) {
            return res.status(400).json({ message: 'Device must have model and manufacturer' });
          }
          break;
        case 'Tool':
          if (!rest.usage || !rest.size) {
            return res.status(400).json({ message: 'Tool must have usage and size' });
          }
          break;
        case 'Chemical':
          if (!rest.formula || !rest.hazardLevel) {
            return res.status(400).json({ message: 'Chemical must have formula and hazard level' });
          }
          break;
        case 'Food':
          if (!rest.expirationDate || rest.isPerishable === undefined) {
            return res.status(400).json({ message: 'Food must have expirationDate and isPerishable' });
          }
          break;
      }
  
      const newMaterial = new Material({
        name,
        cost,
        description,
        quantity,
        type,
        ...rest
      });
  
      await newMaterial.save();
      res.status(201).json(newMaterial);
  
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  
  

export default router;

