
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, FileSearch } from 'lucide-react';

const mockRecords = [
  { id: 201, patientId: "P12345", patientName: "Rajesh Kumar", recordType: "Prescription", doctor: "Dr. Sharma", createdAt: "2025-04-15", fileUrl: "#" },
  { id: 202, patientId: "P23456", patientName: "Priya Singh", recordType: "Lab Report", doctor: "Dr. Gupta", createdAt: "2025-04-17", fileUrl: "#" },
  { id: 203, patientId: "P34567", patientName: "Mohammed Ali", recordType: "Discharge Summary", doctor: "Dr. Patel", createdAt: "2025-04-18", fileUrl: "#" },
  { id: 204, patientId: "P45678", patientName: "Ananya Mehta", recordType: "X-Ray Report", doctor: "Dr. Singh", createdAt: "2025-04-20", fileUrl: "#" },
  { id: 205, patientId: "P56789", patientName: "Vikram Joshi", recordType: "MRI Scan", doctor: "Dr. Kumar", createdAt: "2025-04-22", fileUrl: "#" }
];

const MedicalRecords: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(mockRecords);

  const handleSearch = () => {
    // Vulnerable: Unvalidated search query could lead to XSS
    if (searchQuery.trim() === "") {
      setFilteredRecords(mockRecords);
    } else {
      const filtered = mockRecords.filter(record => 
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.recordType.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Records
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Patient name or ID"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button onClick={handleSearch} className="bg-hospital-blue hover:bg-blue-700 whitespace-nowrap">
            <FileSearch className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Record Type</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.patientId}</TableCell>
                  <TableCell>{record.patientName}</TableCell>
                  <TableCell>{record.recordType}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell>{record.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <a 
                        href={record.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-hospital-blue hover:underline"
                      >
                        View
                      </a>
                      <button className="text-hospital-blue hover:underline">Download</button>
                      {/* Vulnerable: No CSRF protection for sensitive operation */}
                      <button className="text-hospital-red hover:underline">Delete</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No records found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalRecords;
