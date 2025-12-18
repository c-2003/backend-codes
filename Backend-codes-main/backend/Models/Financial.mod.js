import mongoose from 'mongoose';

const FinancialRecordSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  revenue: { 
    type: Number, 
    required: true 
  },
  expenses: { 
    type: Number, 
    required: true 
  },
  profitMargin: { 
    type: Number, 
    required: true 
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields.
});

export default mongoose.model('FinancialRecord', FinancialRecordSchema);

