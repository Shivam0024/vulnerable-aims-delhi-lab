
import React from 'react';
import { Users, Calendar, FileText, Activity, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentPatients from '@/components/dashboard/RecentPatients';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patient Portal</h1>
        <p className="text-gray-600">Welcome to AIMS Hospital Patient Management System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Your Appointments" 
          value="5" 
          icon={<Calendar size={24} />} 
          trend={{ value: 2, isUp: true }}
        />
        <StatCard 
          title="Medical Records" 
          value="12" 
          icon={<FileText size={24} />} 
          trend={{ value: 3, isUp: true }}
        />
        <StatCard 
          title="Prescriptions" 
          value="8" 
          icon={<Activity size={24} />} 
          trend={{ value: 1, isUp: true }}
        />
        <StatCard 
          title="Your Doctors" 
          value="3" 
          icon={<Users size={24} />}
        />
      </div>
      
      <div className="mb-6">
        <Link to="/upload-report">
          <Button className="bg-hospital-blue hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Medical Report
          </Button>
        </Link>
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
