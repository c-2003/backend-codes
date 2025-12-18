import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  childId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Children', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['on-time', 'late', 'absent'], 
    required: true 
  },
}, {
  timestamps: true  // This will automatically add `createdAt` and `updatedAt` fields.
});

export default mongoose.model('Attendance', AttendanceSchema);

