import Attendance from '../Models/Attendances.mod.js';

// Get attendance metrics
export const getAttendanceMetrics = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();

    // Calculate attendance metrics
    const onTime = attendanceRecords.filter(record => record.status === 'on-time').length;
    const late = attendanceRecords.filter(record => record.status === 'late').length;
    const absent = attendanceRecords.filter(record => record.status === 'absent').length;

    res.json({
      onTime,
      late,
      absent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
