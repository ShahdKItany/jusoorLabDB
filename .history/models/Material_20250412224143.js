import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cost: { type: Number, required: true },
  description: String,
  quantity: { type: Number, default: 1 },
  type: {
    type: String,
    required: true,
    enum: ['Device', 'Tool', 'Chemical', 'Food'],
  },

  // حالة المادة (متاحة / غير متاحة)
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },

  // جهاز
  model: String,
  manufacturer: String,
  warranty: String,
  usageCount: { type: Number, default: 0 },   // عدد مرات الاستخدام
  maxUsage: Number,                           // أقصى عدد مرات مسموحة

  // أداة
  usage: String,
  size: String,

  // مادة كيميائية
  formula: String,
  hazardLevel: String,
  expiryDate: Date, // يمكن استخدامها لجميع الأنواع إذا احتجت

  // طعام
  expirationDate: Date,
  storageTemp: String,
  isPerishable: Boolean,

  // تاريخ الإضافة
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Material', materialSchema);
