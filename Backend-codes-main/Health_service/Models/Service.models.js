import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error('Price cannot be negative');
    }
  }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
