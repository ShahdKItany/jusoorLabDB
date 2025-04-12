import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cost: { type: Number, required: true },
  description: String,
  quantity: Number,
  type: {
    type: String,
    required: true,
    enum: ['Device', 'Tool', 'Chemical', 'Food'],
  },
  // Fields for Device
  model: String,
  manufacturer: String,
  warranty: String,

  // Fields for Tool
  usage: String,
  size: String,

  // Fields for Chemical
  formula: String,
  hazardLevel: String,
  expiryDate: Date,

  // Fields for Food
  expirationDate: Date,
  storageTemp: String,
  isPerishable: Boolean,
});

export default mongoose.model('Material', materialSchema);
