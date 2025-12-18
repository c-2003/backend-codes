import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  newEnrollmentsCount: { 
    type: Number, 
    required: true 
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields.
});

export default mongoose.model('Enrollment', EnrollmentSchema);

