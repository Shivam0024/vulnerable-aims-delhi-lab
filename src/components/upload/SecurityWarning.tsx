
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SecurityWarning: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <div className="flex">
        <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
        <div>
          <h3 className="font-bold text-yellow-700">Security Warning</h3>
          <p className="text-yellow-700">
            This upload form has intentional security vulnerabilities for demonstration purposes.
            The files you upload will be accessible via HTTP and FTP, and may be captured by Dionaea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityWarning;
