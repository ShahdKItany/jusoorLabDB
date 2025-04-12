import express from 'express';
import Material from '../models/Material.js';

const router = express.Router();

// ✅ عرض كل المواد
router.get('/', async (req, res) => {
  const items = await Material.find();
  res.json(items);
});

// ✅ عرض المواد المتاحة فقط
router.get('/available', async (req, res) => {
  const available = await Material.find({ status: 'available' });
  res.json(available);
});

// ✅ عرض المواد غير المتاحة فقط
router.get('/unavailable', async (req, res) => {
  const unavailable = await Material.find({ status: 'unavailable' });
  res.json(unavailable);
});

// ✅ إضافة مادة جديدة
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

// ✅ تعديل مادة
router.put('/:id', async (req, res) => {
  try {
    const updated = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Material not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ حذف مادة
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ تحديث الحالة تلقائيًا
router.patch('/update-status/auto', async (req, res) => {
  try {
    const materials = await Material.find();
    const today = new Date();

    const updates = await Promise.all(materials.map(async (material) => {
      let updatedStatus = 'available';

      const expired = (material.expiryDate && material.expiryDate < today) ||
                      (material.expirationDate && material.expirationDate < today);

      const usageExceeded = material.maxUsage && material.usageCount >= material.maxUsage;

      if (expired || usageExceeded) {
        updatedStatus = 'unavailable';
      }

      if (material.status !== updatedStatus) {
        material.status = updatedStatus;
        await material.save();
      }

      return material;
    }));

    res.json({ message: 'Statuses updated', data: updates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
