
import React from 'react';
import { Link } from 'react-router-dom';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
  doctor: string;
  lastVisit: string;
}

const RecentPatients: React.FC = () => {
  // This would normally come from an API but we'll hardcode for the demo
  const patients: Patient[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      condition: 'Hypertension',
      doctor: 'Dr. Sharma',
      lastVisit: '2025-04-25'
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 32,
      gender: 'Female',
      condition: 'Pregnancy',
      doctor: 'Dr. Gupta',
      lastVisit: '2025-04-26'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      age: 58,
      gender: 'Male',
      condition: 'Diabetes',
      doctor: 'Dr. Patel',
      lastVisit: '2025-04-27'
    },
    {
      id: 4,
      name: 'Sunita Verma',
      age: 27,
      gender: 'Female',
      condition: 'Influenza',
      doctor: 'Dr. Khan',
      lastVisit: '2025-04-28'
    }
  ];
  
  // Vulnerable: HTML injection through local storage
  React.useEffect(() => {
    const container = document.getElementById('notifications');
    if (container) {
      // Vulnerable: directly renders HTML from localStorage without sanitization
      container.innerHTML = localStorage.getItem('notifications') || 'No new notifications';
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Recent Patients</h3>
        <div id="notifications" className="text-sm text-hospital-red"></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.age} / {patient.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.condition}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.doctor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/patients/${patient.id}`} className="text-hospital-blue hover:text-blue-800">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Link to="/patients" className="text-sm text-hospital-blue hover:underline">
          View all patients →
        </Link>
      </div>
    </div>
  );
};

export default RecentPatients;
