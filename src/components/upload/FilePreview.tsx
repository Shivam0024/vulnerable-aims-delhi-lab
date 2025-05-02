
import React from 'react';

type FilePreviewProps = {
  file: File | null;
};

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  if (!file) return null;
  
  return (
    <p className="text-xs text-gray-500">
      {file.name} ({Math.round(file.size / 1024)} KB)
    </p>
  );
};

export default FilePreview;
