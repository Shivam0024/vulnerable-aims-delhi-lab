
import React from 'react';

type UploadSuccessProps = {
  uploadedFilePath: string | null;
};

const UploadSuccess: React.FC<UploadSuccessProps> = ({ uploadedFilePath }) => {
  if (!uploadedFilePath) return null;
  
  return (
    <div className="p-4 border border-green-200 rounded-md bg-green-50">
      <h3 className="font-medium text-green-800">File uploaded successfully!</h3>
      <p className="text-sm text-green-700">Your file is now accessible at:</p>
      <code className="block mt-2 p-2 bg-green-100 text-green-800 rounded">
        http://localhost:3000{uploadedFilePath}
      </code>
      <p className="mt-2 text-xs text-green-700">
        The file is also available via FTP for Dionaea to capture.
      </p>
    </div>
  );
};

export default UploadSuccess;
