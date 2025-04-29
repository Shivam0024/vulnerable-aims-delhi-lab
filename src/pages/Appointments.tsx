
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { calendar, clock } from 'lucide-react';

const mockAppointments = [
  { id: 101, patient: "Rajesh Kumar", doctor: "Dr. Sharma", date: "2025-04-30", time: "10:00 AM", status: "Confirmed" },
  { id: 102, patient: "Priya Singh", doctor: "Dr. Gupta", date: "2025-04-30", time: "11:30 AM", status: "Confirmed" },
  { id: 103, patient: "Mohammed Ali", doctor: "Dr. Patel", date: "2025-05-01", time: "09:15 AM", status: "Pending" },
  { id: 104, patient: "Ananya Mehta", doctor: "Dr. Singh", date: "2025-05-02", time: "02:00 PM", status: "Confirmed" },
  { id: 105, patient: "Vikram Joshi", doctor: "Dr. Kumar", date: "2025-05-03", time: "03:30 PM", status: "Cancelled" }
];

const mockDoctors = [
  { id: 1, name: "Dr. Sharma", specialty: "Cardiology" },
  { id: 2, name: "Dr. Gupta", specialty: "Neurology" },
  { id: 3, name: "Dr. Patel", specialty: "Pediatrics" },
  { id: 4, name: "Dr. Singh", specialty: "Orthopedics" },
  { id: 5, name: "Dr. Kumar", specialty: "General Medicine" }
];

const Appointments: React.FC = () => {
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    patientPhone: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vulnerable: Form data is not validated and could be manipulated
    alert(`Appointment booked for ${bookingForm.patientName} with ${
      mockDoctors.find(d => d.id === parseInt(bookingForm.doctorId))?.name || 'Unknown Doctor'
    }`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <calendar className="h-6 w-6" />
          </div>
        </div>

        <Tabs defaultValue="all-appointments">
          <TabsList>
            <TabsTrigger value="all-appointments">View All Appointments</TabsTrigger>
            <TabsTrigger value="book-new">Book New Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-appointments" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppointments.map(appointment => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                        appointment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="text-hospital-blue hover:underline">Edit</button>
                        <button className="text-hospital-red hover:underline">Cancel</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="book-new" className="mt-4">
            <div className="border rounded-md p-6 bg-white">
              <h2 className="text-lg font-semibold mb-4">Book New Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={bookingForm.patientName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Phone
                    </label>
                    <input
                      type="text"
                      name="patientPhone"
                      value={bookingForm.patientPhone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Doctor
                    </label>
                    <select
                      name="doctorId"
                      value={bookingForm.doctorId}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">-- Select Doctor --</option>
                      {mockDoctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={bookingForm.appointmentDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={bookingForm.appointmentTime}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-6">
                  <Button type="submit" className="bg-hospital-blue hover:bg-blue-700">
                    <clock className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Appointments;
