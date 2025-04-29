
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload, Upload } from 'lucide-react';

const UploadReport: React.FC = () => {
  const { toast } = useToast();
  const [reportTitle, setReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewText, setPreviewText] = useState<string>('');
  
  // Vulnerable: Directly inserting user input into the DOM
  const renderPreview = () => {
    return { __html: previewText };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextPreview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Vulnerable: No sanitization of user input
    setPreviewText(e.target.value);
    setComments(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vulnerable: Constructing SQL query with user input
    const sqlQuery = `INSERT INTO reports (title, date, type, comments, file_name) 
                      VALUES ('${reportTitle}', '${reportDate}', '${reportType}', '${comments}', '${file?.name || ""}')`;
    
    console.log("Executing SQL query (vulnerable to SQL injection):", sqlQuery);
    
    toast({
      title: "Report Uploaded",
      description: "Your report has been uploaded successfully.",
    });

    // Reset form
    setReportTitle('');
    setReportDate('');
    setReportType('');
    setComments('');
    setFile(null);
    setPreviewText('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Upload Medical Report</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <FileUpload className="h-6 w-6" />
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
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium">
                    Upload File
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

              <div className="flex justify-end">
                <Button type="submit" className="bg-hospital-blue hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Note: This form is intentionally vulnerable to demonstrate security risks. Do not use in production.
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default UploadReport;
