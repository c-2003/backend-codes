import mongoose from 'mongoose';

const ChildrenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

export default mongoose.model('Children', ChildrenSchema);
