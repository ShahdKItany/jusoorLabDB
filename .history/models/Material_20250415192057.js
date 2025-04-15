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

  status: {
    type: String,
    required: true,
    enum: ['available', 'unavailable'],
    default: 'available',
  },

  // خصائص عامة لكل الأنواع
  usageCount: { type: Number, default: 0 },   // عدد مرات الاستخدام
  maxUsage: { type: Number, required: true }, // أقصى عدد مرات مسموحة (إجباري)

  // خصائص النوع: جهاز
  model: String,
  manufacturer: String,
  warranty: String,

  // خصائص النوع: أداة
  usage: String,
  size: String,

  // خصائص النوع: مادة كيميائية
  formula: String,
  unit: String,
  expiryDate: Date, // اختياري

  // خصائص النوع: طعام
  expirationDate: Date,  // اختياري
  storageTemp: String,
  isPerishable: Boolean,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Material', materialSchema);
