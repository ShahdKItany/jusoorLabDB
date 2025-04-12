import express from 'express';
import Experiment from '../models/Experiment.js';
import Material from '../models/Material.js';

const router = express.Router();

// إنشاء تجربة جديدة
router.post('/', async (req, res) => {
  try {
    const { nameEn, nameAr, type, materials } = req.body;

    if (!['Physics', 'Chemistry', 'Biology', 'Geology', 'Science'].includes(type)) {
      return res.status(400).json({ message: 'Invalid experiment type.' });
    }

    const materialIds = materials.map(item => item.material);
    const materialsInDB = await Material.find({ '_id': { $in: materialIds } });

    if (materialsInDB.length !== materials.length) {
      return res.status(400).json({ message: 'Some materials do not exist in the database.' });
    }

    let totalCost = 0;
    const materialsWithCost = materials.map(item => {
      const material = materialsInDB.find(m => m._id.toString() === item.material);
      const materialTotalCost = material.cost * item.quantityUsed;
      totalCost += materialTotalCost;
      return {
        material: item.material,
        quantityUsed: item.quantityUsed,
        totalCost: materialTotalCost
      };
    });

    const newExperiment = new Experiment({
      nameEn,
      nameAr,
      type,
      materials: materialsWithCost,
      totalCost
    });

    await newExperiment.save();
    res.status(201).json(newExperiment);

  } catch (error) {
    res.status(500).json({ message: 'Error creating experiment.', error: error.message });
  }
});

// جلب كل التجارب
router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find().populate('materials.material');
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ تعديل تجربة
router.put('/:id', async (req, res) => {
  try {
    const { nameEn, nameAr, type, materials } = req.body;

    if (!['Physics', 'Chemistry', 'Biology', 'Geology', 'Science'].includes(type)) {
      return res.status(400).json({ message: 'Invalid experiment type.' });
    }

    const materialIds = materials.map(item => item.material);
    const materialsInDB = await Material.find({ '_id': { $in: materialIds } });

    if (materialsInDB.length !== materials.length) {
      return res.status(400).json({ message: 'Some materials do not exist in the database.' });
    }

    let totalCost = 0;
    const materialsWithCost = materials.map(item => {
      const material = materialsInDB.find(m => m._id.toString() === item.material);
      const materialTotalCost = material.cost * item.quantityUsed;
      totalCost += materialTotalCost;
      return {
        material: item.material,
        quantityUsed: item.quantityUsed,
        totalCost: materialTotalCost
      };
    });

    const updatedExperiment = await Experiment.findByIdAndUpdate(
      req.params.id,
      {
        nameEn,
        nameAr,
        type,
        materials: materialsWithCost,
        totalCost
      },
      { new: true, runValidators: true }
    );

    if (!updatedExperiment) {
      return res.status(404).json({ message: 'Experiment not found.' });
    }

    res.json(updatedExperiment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experiment.', error: error.message });
  }
});

// ✅ حذف تجربة
router.delete('/:id', async (req, res) => {
  try {
    const deletedExperiment = await Experiment.findByIdAndDelete(req.params.id);
    if (!deletedExperiment) {
      return res.status(404).json({ message: 'Experiment not found.' });
    }
    res.json({ message: 'Experiment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experiment.', error: error.message });
  }
});

export default router;
