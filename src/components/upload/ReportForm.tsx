
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import FilePreview from './FilePreview';
import HtmlPreview from './HtmlPreview';
import UploadSuccess from './UploadSuccess';
import { toast as sonnerToast } from 'sonner';
import { useToast } from "@/hooks/use-toast";

// Use the correct server URL based on environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : `${window.location.protocol}//${window.location.hostname}:3000/api`;

type ReportFormProps = {};

const ReportForm: React.FC<ReportFormProps> = () => {
  const { toast } = useToast();
  const [reportTitle, setReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewText, setPreviewText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Show file info
      sonnerToast("File selected", {
        description: `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`,
      });
    }
  };

  const handleTextPreview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Vulnerable: No sanitization of user input
    setPreviewText(e.target.value);
    setComments(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show that we're loading
    setIsLoading(true);
    
    try {
      if (!file) {
        throw new Error("No file selected");
      }
      
      // Create form data for multipart file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', reportTitle);
      formData.append('date', reportDate);
      formData.append('type', reportType);
      formData.append('comments', comments);
      
      // Log formdata (vulnerable to data exposure)
      console.log("Submitting form data:", {
        title: reportTitle,
        date: reportDate,
        type: reportType,
        comments: comments,
        fileName: file.name,
        fileSize: file.size
      });
      
      // Upload to backend - use the API_URL constant
      const response = await fetch(`${API_URL}/upload-report`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }
      
      // Vulnerable: Constructing SQL query with user input
      const sqlQuery = `INSERT INTO reports (title, date, type, comments, file_name) 
                      VALUES ('${reportTitle}', '${reportDate}', '${reportType}', '${comments}', '${file.name}')`;
      
      console.log("Executing SQL query (vulnerable to SQL injection):", sqlQuery);
      
      // Show success message
      toast({
        title: "Report Uploaded",
        description: "Your report has been uploaded successfully.",
      });
      
      sonnerToast.success("File uploaded to server", {
        description: "The file is now accessible via HTTP and FTP"
      });
      
      // Set the uploaded file path for user to access
      setUploadedFilePath(result.filePath);
      
      // Reset form
      setReportTitle('');
      setReportDate('');
      setReportType('');
      setComments('');
      setFile(null);
      setPreviewText('');
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="reportTitle" className="text-sm font-medium">
            Report Title
          </label>
          <Input
            id="reportTitle"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            placeholder="Enter report title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="reportDate" className="text-sm font-medium">
            Report Date
          </label>
          <Input
            id="reportDate"
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="reportType" className="text-sm font-medium">
            Report Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Report Type</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
            <option value="CT Scan">CT Scan</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Executable">Executable File</option>
            <option value="Document">Document</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="file" className="text-sm font-medium">
            Upload File (Any File Type Allowed)
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <FilePreview file={file} />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="comments" className="text-sm font-medium">
          Comments & Notes (HTML/Script enabled - for testing purposes)
        </label>
        <Textarea
          id="comments"
          value={comments}
          onChange={handleTextPreview}
          placeholder="Enter comments or paste HTML/Script here"
          rows={4}
        />
      </div>
      
      <HtmlPreview previewText={previewText} />
      
      <UploadSuccess uploadedFilePath={uploadedFilePath} />

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-hospital-blue hover:bg-blue-700"
          disabled={isLoading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isLoading ? "Uploading..." : "Upload Report"}
        </Button>
      </div>
    </form>
  );
};

export default ReportForm;
