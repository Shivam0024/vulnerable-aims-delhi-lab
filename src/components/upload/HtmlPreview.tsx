
import React from 'react';

type HtmlPreviewProps = {
  previewText: string;
};

const HtmlPreview: React.FC<HtmlPreviewProps> = ({ previewText }) => {
  // Vulnerable: Directly inserting user input into the DOM
  const renderPreview = () => {
    return { __html: previewText };
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Live Preview (Vulnerable to XSS)</h3>
      <div 
        className="p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[100px]"
        dangerouslySetInnerHTML={renderPreview()}
      />
      <p className="text-xs text-red-500">Warning: This preview renders HTML without sanitization - demonstrating XSS vulnerability.</p>
    </div>
  );
};

export default HtmlPreview;
