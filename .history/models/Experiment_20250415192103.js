

import mongoose from 'mongoose';

const experimentSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    unique: true,
   // required: true
  },
  nameAr: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['Physics', 'Chemistry', 'Biology', 'Geology', 'Science'], // الأنواع المتاحة
    required: true
  },
  materials: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
        required: true
      },
      quantityUsed: {
        type: Number,
        required: true
      },
      totalCost: {
        type: Number,  // تكلفة كل مادة بناء على الكمية
        required: true
      }
    }
  ],
  totalCost: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Experiment', experimentSchema);
