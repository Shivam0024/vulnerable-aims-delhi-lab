
import React from 'react';

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const UpcomingAppointments: React.FC = () => {
  // This would normally come from an API but we'll hardcode for the demo
  const appointments: Appointment[] = [
    {
      id: 101,
      patient: 'Rajesh Kumar',
      doctor: 'Dr. Sharma',
      date: '2025-04-30',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: 102,
      patient: 'Priya Singh',
      doctor: 'Dr. Gupta',
      date: '2025-04-30',
      time: '11:30 AM',
      status: 'confirmed'
    },
    {
      id: 103,
      patient: 'Mohammed Ali',
      doctor: 'Dr. Patel',
      date: '2025-05-01',
      time: '09:15 AM',
      status: 'pending'
    }
  ];
  
  // Vulnerable function - uses eval() which is a severe security risk
  const getAppointmentTime = (dateStr: string, timeStr: string) => {
    // This is intentionally vulnerable code - NEVER do this in real applications
    // eslint-disable-next-line no-eval
    return eval(`new Date("${dateStr}T${timeStr.replace(' AM', ':00').replace(' PM', ':00')}").toLocaleString()`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Upcoming Appointments</h3>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="border-l-4 border-hospital-blue p-4 bg-hospital-lightblue rounded-r-lg"
          >
            <div className="flex justify-between">
              <div className="font-medium">{appointment.patient}</div>
              <div className={`text-sm ${
                appointment.status === 'confirmed' ? 'text-hospital-green' : 
                appointment.status === 'pending' ? 'text-yellow-500' : 'text-hospital-red'
              }`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mt-1">with {appointment.doctor}</div>
            
            <div className="mt-2 text-sm">
              {/* Vulnerable: using eval() to process date strings */}
              {getAppointmentTime(appointment.date, appointment.time)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <button 
          className="w-full py-2 bg-hospital-blue text-white rounded-md hover:bg-blue-700"
          // Vulnerable: clicking could trigger XSS if HTML is injected in the URL
          onClick={() => window.location.href = '/appointments' + location.hash}
        >
          Schedule New Appointment
        </button>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
