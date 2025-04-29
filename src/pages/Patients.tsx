
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  bloodGroup: string;
  lastVisit: string;
  doctor: string;
}

const Patients: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // This would normally come from an API, but we'll hardcode for the demo
  const patients: Patient[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      contact: '+91 98765 43210',
      bloodGroup: 'B+',
      lastVisit: '2025-04-25',
      doctor: 'Dr. Sharma'
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 32,
      gender: 'Female',
      contact: '+91 87654 32109',
      bloodGroup: 'O+',
      lastVisit: '2025-04-26',
      doctor: 'Dr. Gupta'
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      age: 58,
      gender: 'Male',
      contact: '+91 76543 21098',
      bloodGroup: 'AB+',
      lastVisit: '2025-04-27',
      doctor: 'Dr. Patel'
    },
    {
      id: 4,
      name: 'Sunita Verma',
      age: 27,
      gender: 'Female',
      contact: '+91 65432 10987',
      bloodGroup: 'A-',
      lastVisit: '2025-04-28',
      doctor: 'Dr. Khan'
    },
    {
      id: 5,
      name: 'Amit Sharma',
      age: 40,
      gender: 'Male',
      contact: '+91 54321 09876',
      bloodGroup: 'B-',
      lastVisit: '2025-04-20',
      doctor: 'Dr. Sharma'
    },
    {
      id: 6,
      name: 'Neha Patel',
      age: 35,
      gender: 'Female',
      contact: '+91 43210 98765',
      bloodGroup: 'O-',
      lastVisit: '2025-04-22',
      doctor: 'Dr. Gupta'
    }
  ];
  
  // Vulnerable search function - susceptible to XSS
  const handleSearch = () => {
    // Simulating a dangerous search operation that could lead to XSS
    const resultsDiv = document.getElementById('search-results');
    if (resultsDiv) {
      // Vulnerable: direct HTML injection
      resultsDiv.innerHTML = `<p>Results for: ${searchTerm}</p>`;
    }
    
    // Vulnerable: directly using user input in SQL-like query
    const sqlQuery = `SELECT * FROM patients WHERE name LIKE '%${searchTerm}%' OR contact LIKE '%${searchTerm}%'`;
    console.log("Search query (vulnerable to SQL injection):", sqlQuery);
    
    toast({
      title: "Search completed",
      description: `Found ${patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.contact.includes(searchTerm)).length} results`,
    });
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.contact.includes(searchTerm)
  );

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-600">Manage patient information</p>
        </div>
        <Link 
          to="/patients/add" 
          className="bg-hospital-blue text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Patient
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search patients by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
        
        {/* Vulnerable: innerHTML used with search input */}
        <div id="search-results" className="mt-2 text-sm text-hospital-red"></div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.age} / {patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.contact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.bloodGroup}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{patient.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/patients/${patient.id}`} className="text-hospital-blue hover:text-blue-800 mr-4">
                      View
                    </Link>
                    <Link to={`/patients/${patient.id}/edit`} className="text-hospital-blue hover:text-blue-800">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Patients;
