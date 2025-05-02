
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// Create Express app
const app = express();

// Set up port - using either environment variable or default 3000
const PORT = process.env.PORT || 3000;

// Configure middleware with more permissive CORS
app.use(cors({
  origin: '*', // Allow all origins for testing purposes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('combined')); // Logging

// Configure storage for uploaded files - using temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in a public directory that Dionaea can monitor
    // This directory should be monitored by Dionaea HTTP handler
    const uploadDir = path.join(__dirname, '../../uploads');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename - include original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize upload middleware with larger size limits
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Enable pre-flight requests for complex requests
app.options('*', cors());

// Endpoint to handle file uploads
app.post('/api/upload-report', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    // Log file information - this helps with tracking what was uploaded
    console.log('File uploaded:', {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
    
    // Also log report metadata
    console.log('Report metadata:', req.body);
    
    // Create an FTP listing that points to the file (for Dionaea's FTP handler)
    const ftpListPath = path.join(__dirname, '../../ftp');
    if (!fs.existsSync(ftpListPath)) {
      fs.mkdirSync(ftpListPath, { recursive: true });
    }
    
    // Create symlink or copy file to FTP directory if needed
    const ftpFilePath = path.join(ftpListPath, req.file.filename);
    fs.copyFileSync(req.file.path, ftpFilePath);
    
    // Return success response with file details
    return res.status(200).json({ 
      success: true, 
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Error uploading file' });
  }
});

// Expose uploads directory to be accessible via HTTP
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Add a basic health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload endpoint: http://localhost:${PORT}/api/upload-report`);
  console.log(`Files will be stored in: ${path.join(__dirname, '../../uploads')}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});
