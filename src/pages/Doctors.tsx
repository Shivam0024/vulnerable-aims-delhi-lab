
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const mockDoctors = [
  { id: 1, name: "Dr. Sharma", specialty: "Cardiology", experience: "15 years", availability: "Mon, Wed, Fri", contact: "+91 98765 43210" },
  { id: 2, name: "Dr. Gupta", specialty: "Neurology", experience: "12 years", availability: "Tue, Thu, Sat", contact: "+91 87654 32109" },
  { id: 3, name: "Dr. Patel", specialty: "Pediatrics", experience: "10 years", availability: "Mon, Tue, Fri", contact: "+91 76543 21098" },
  { id: 4, name: "Dr. Singh", specialty: "Orthopedics", experience: "14 years", availability: "Wed, Thu, Sat", contact: "+91 65432 10987" },
  { id: 5, name: "Dr. Kumar", specialty: "General Medicine", experience: "8 years", availability: "Mon, Wed, Sat", contact: "+91 54321 09876" }
];

const Doctors: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Doctors</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <Shield className="h-6 w-6" />
          </div>
        </div>
        
        <Tabs defaultValue="all-doctors">
          <TabsList>
            <TabsTrigger value="all-doctors">All Doctors</TabsTrigger>
            <TabsTrigger value="schedule">Doctor Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-doctors" className="mt-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDoctors.map(doctor => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.experience}</TableCell>
                      <TableCell>{doctor.availability}</TableCell>
                      <TableCell>{doctor.contact}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Book Appointment</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Doctor Schedule</h2>
              <div className="grid grid-cols-7 gap-4 mb-4 text-center">
                <div className="font-medium">Monday</div>
                <div className="font-medium">Tuesday</div>
                <div className="font-medium">Wednesday</div>
                <div className="font-medium">Thursday</div>
                <div className="font-medium">Friday</div>
                <div className="font-medium">Saturday</div>
                <div className="font-medium">Sunday</div>
              </div>
              
              <div className="space-y-6">
                {mockDoctors.map(doctor => (
                  <div key={doctor.id} className="border-b pb-4">
                    <div className="font-medium mb-2">{doctor.name} - {doctor.specialty}</div>
                    <div className="grid grid-cols-7 gap-4 text-center">
                      <div className={doctor.availability.includes('Mon') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Mon') ? '9AM - 2PM' : '-'}
                      </div>
                      <div className={doctor.availability.includes('Tue') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Tue') ? '9AM - 2PM' : '-'}
                      </div>
                      <div className={doctor.availability.includes('Wed') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Wed') ? '9AM - 2PM' : '-'}
                      </div>
                      <div className={doctor.availability.includes('Thu') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Thu') ? '9AM - 2PM' : '-'}
                      </div>
                      <div className={doctor.availability.includes('Fri') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Fri') ? '9AM - 2PM' : '-'}
                      </div>
                      <div className={doctor.availability.includes('Sat') ? "bg-green-100 p-2 rounded" : "p-2"}>
                        {doctor.availability.includes('Sat') ? '9AM - 2PM' : '-'}
                      </div>
                      <div>-</div>
                    </div>
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
