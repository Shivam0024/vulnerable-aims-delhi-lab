
import React from 'react';
import { Users, Calendar, FileText, Activity } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentPatients from '@/components/dashboard/RecentPatients';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to AIMS Hospital Management System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Patients" 
          value="1,342" 
          icon={<Users size={24} />} 
          trend={{ value: 12, isUp: true }}
        />
        <StatCard 
          title="Appointments" 
          value="48" 
          icon={<Calendar size={24} />} 
          trend={{ value: 3, isUp: true }}
        />
        <StatCard 
          title="Medical Records" 
          value="2,845" 
          icon={<FileText size={24} />} 
          trend={{ value: 8, isUp: true }}
        />
        <StatCard 
          title="Active Doctors" 
          value="26" 
          icon={<Activity size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentPatients />
        </div>
        <div>
          <UpcomingAppointments />
        </div>
      </div>
      
      {/* Vulnerable: Direct HTML injection from URL parameter */}
      <div 
        className="mt-8 p-4 bg-blue-50 rounded-lg" 
        dangerouslySetInnerHTML={{ 
          __html: new URLSearchParams(window.location.search).get('message') || 'No system messages'
        }} 
      />
    </Layout>
  );
};

export default Index;
