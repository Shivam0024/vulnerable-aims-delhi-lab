
import React from 'react';
import { FileText } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Upload Medical Report</h1>
      <div className="bg-hospital-blue p-2 rounded-full text-white">
        <FileText className="h-6 w-6" />
      </div>
    </div>
  );
};

export default PageHeader;
