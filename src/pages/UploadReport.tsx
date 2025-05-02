
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, AlertTriangle } from 'lucide-react';

// Use the correct server URL based on environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : `${window.location.protocol}//${window.location.hostname}:3000/api`;

const UploadReport: React.FC = () => {
  const { toast } = useToast();
  const [reportTitle, setReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewText, setPreviewText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);
  
  // Vulnerable: Directly inserting user input into the DOM
  const renderPreview = () => {
    return { __html: previewText };
  };

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
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Upload Medical Report</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        
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
        
        <Card>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {file && <p className="text-xs text-gray-500">{file.name} ({Math.round(file.size / 1024)} KB)</p>}
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
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Live Preview (Vulnerable to XSS)</h3>
                <div 
                  className="p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[100px]"
                  dangerouslySetInnerHTML={renderPreview()}
                />
                <p className="text-xs text-red-500">Warning: This preview renders HTML without sanitization - demonstrating XSS vulnerability.</p>
              </div>

              {uploadedFilePath && (
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
              )}

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
