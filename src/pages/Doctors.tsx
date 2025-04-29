
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { shield } from 'lucide-react';

const mockDoctors = [
  { id: 1, name: "Dr. Sharma", specialty: "Cardiology", experience: "15 years", availability: "Mon, Wed, Fri" },
  { id: 2, name: "Dr. Gupta", specialty: "Neurology", experience: "12 years", availability: "Tue, Thu, Sat" },
  { id: 3, name: "Dr. Patel", specialty: "Pediatrics", experience: "8 years", availability: "Mon, Tue, Wed" },
  { id: 4, name: "Dr. Singh", specialty: "Orthopedics", experience: "10 years", availability: "Wed, Thu, Fri" },
  { id: 5, name: "Dr. Kumar", specialty: "General Medicine", experience: "14 years", availability: "Mon, Fri, Sat" }
];

const Doctors: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Doctors Management</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <shield className="h-6 w-6" />
          </div>
        </div>

        <Tabs defaultValue="all-doctors">
          <TabsList>
            <TabsTrigger value="all-doctors">All Doctors</TabsTrigger>
            <TabsTrigger value="schedule">Doctor Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-doctors" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDoctors.map(doctor => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.experience}</TableCell>
                    <TableCell>{doctor.availability}</TableCell>
                    <TableCell>
                      <button className="text-hospital-blue hover:underline">View Profile</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-4">
            <div className="border rounded-md p-6 bg-white">
              <h2 className="text-lg font-semibold mb-4">Doctor Schedule - April 2025</h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="bg-gray-100 p-2 font-medium">Monday</div>
                <div className="bg-gray-100 p-2 font-medium">Tuesday</div>
                <div className="bg-gray-100 p-2 font-medium">Wednesday</div>
                <div className="bg-gray-100 p-2 font-medium">Thursday</div>
                <div className="bg-gray-100 p-2 font-medium">Friday</div>
                <div className="bg-gray-100 p-2 font-medium">Saturday</div>
                <div className="bg-gray-100 p-2 font-medium">Sunday</div>
                
                {/* Week 1 */}
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="border p-2 min-h-20">
                    <div className="text-xs text-right text-gray-500">{i + 1}</div>
                    {i < 5 && (
                      <div className="text-xs mt-1 bg-hospital-lightblue p-1 rounded">
                        {mockDoctors[i % 5].name}: 9AM - 1PM
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Week 2 */}
                {[...Array(7)].map((_, i) => (
                  <div key={i+7} className="border p-2 min-h-20">
                    <div className="text-xs text-right text-gray-500">{i + 8}</div>
                    {i < 5 && (
                      <div className="text-xs mt-1 bg-hospital-lightblue p-1 rounded">
                        {mockDoctors[(i + 2) % 5].name}: 9AM - 1PM
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Doctors;
