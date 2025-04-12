import mongoose from 'mongoose';
const experimentSchema = new mongoose.Schema({
  name: String,
  type: String
});
export default mongoose.model('Experiment', experimentSchema);