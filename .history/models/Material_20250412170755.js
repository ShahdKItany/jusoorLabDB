import mongoose from 'mongoose';
const materialSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number
});
export default mongoose.model('Material', materialSchema);