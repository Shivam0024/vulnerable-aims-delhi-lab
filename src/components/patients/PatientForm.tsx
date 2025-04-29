
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PatientFormProps {
  onSubmit: (patientData: any) => void;
  initialData?: any;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, initialData = {} }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    age: initialData.age || '',
    gender: initialData.gender || 'male',
    contact: initialData.contact || '',
    email: initialData.email || '',
    address: initialData.address || '',
    bloodGroup: initialData.bloodGroup || '',
    medicalHistory: initialData.medicalHistory || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vulnerable: Direct SQL query construction with user input
    // In a real app, this would call an API endpoint, but we'll simulate it
    const sqlQuery = `INSERT INTO patients (name, age, gender, contact, email, address, blood_group, medical_history) 
                     VALUES ('${formData.name}', ${formData.age}, '${formData.gender}', '${formData.contact}', 
                            '${formData.email}', '${formData.address}', '${formData.bloodGroup}', '${formData.medicalHistory}')`;
    
    console.log("SQL Query (vulnerable to SQL injection):", sqlQuery);
    
    // Simulate submission
    onSubmit(formData);
    
    toast({
      title: "Patient information saved",
      description: "The patient data has been saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
          Medical History
        </label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
        ></textarea>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-hospital-blue text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Save Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
