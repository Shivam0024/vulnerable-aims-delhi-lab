
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PatientForm from '@/components/patients/PatientForm';
import { ArrowLeft } from 'lucide-react';

const AddPatient: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (patientData: any) => {
    // This would normally send data to an API
    console.log("New patient data:", patientData);
    
    // Simulate successful submission
    setTimeout(() => {
      navigate('/patients');
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800">Add New Patient</h1>
        <p className="text-gray-600">Register a new patient in the system</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <PatientForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AddPatient;
