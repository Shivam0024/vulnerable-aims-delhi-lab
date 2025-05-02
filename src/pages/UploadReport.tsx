
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import PageHeader from '@/components/upload/PageHeader';
import SecurityWarning from '@/components/upload/SecurityWarning';
import ReportForm from '@/components/upload/ReportForm';

const UploadReport: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <PageHeader />
        <SecurityWarning />
        
        <Card>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportForm />
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            <p>Note: This form is intentionally vulnerable to demonstrate security risks like XSS and file upload vulnerabilities. 
            Files will be accessible via HTTP and FTP protocols for Dionaea to capture.</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadReport;
