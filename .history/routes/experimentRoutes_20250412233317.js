import express from 'express';
import Experiment from '../models/Experiment.js';
import Material from '../models/Material.js';

const router = express.Router();

// إضافة تجربة جديدة مع حساب التكلفة الإجمالية
router.post('/', async (req, res) => {
  try {
    const { nameEn, nameAr, type, materials } = req.body;

    // تحقق من نوع التجربة
    if (!['Physics', 'Chemistry', 'Biology', 'Geology', 'Science'].includes(type)) {
      return res.status(400).json({ message: 'Invalid experiment type. It must be one of: Physics, Chemistry, Biology, Geology, Science.' });
    }

    // تحقق من وجود المواد في قاعدة البيانات
    const materialIds = materials.map(item => item.material); // استخدم الـ ID الخاص بكل مادة
    const materialsInDB = await Material.find({ '_id': { $in: materialIds } });

    // تحقق من أن جميع المواد موجودة في قاعدة البيانات
    if (materialsInDB.length !== materials.length) {
      return res.status(400).json({ message: 'Some materials do not exist in the database.' });
    }

    // حساب التكلفة الإجمالية لكل مادة
    let totalCost = 0;
    const materialsWithCost = materials.map(item => {
      const material = materialsInDB.find(m => m._id.toString() === item.material);
      const materialTotalCost = material.cost * item.quantityUsed; // التكلفة الإجمالية للمادة
      totalCost += materialTotalCost; // إضافة التكلفة إلى التكلفة الإجمالية
      return {
        material: item.material,
        quantityUsed: item.quantityUsed,
        totalCost: materialTotalCost
      };
    });

    // إنشاء تجربة جديدة
    const newExperiment = new Experiment({
      nameEn,
      nameAr,
      type,
      materials: materialsWithCost,
      totalCost
    });

    // حفظ التجربة في قاعدة البيانات
    await newExperiment.save();

    // الرد بالتجربة الجديدة مع التكلفة
    res.status(201).json(newExperiment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating experiment.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find(); 
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedExperiment = await Experiment.findByIdAndDelete(req.params.id);

    if (!deletedExperiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }

    res.json({ message: 'Experiment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experiment.', error: error.message });
  }
});


export default router;
