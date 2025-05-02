
# Dionaea Integration Guide

This document explains how the upload functionality integrates with Dionaea honeypot for capturing malicious files.

## Setup Overview

1. The Express.js backend server saves uploaded files to the `uploads/` directory
2. Files are also copied to the `ftp/` directory to be accessible via FTP
3. Dionaea should be configured to monitor these directories

## Dionaea Configuration

### HTTP Protocol Configuration

Update your Dionaea configuration to monitor the HTTP server:

```yaml
services:
  http:
    enabled: yes
    port: 80
    listen_addresses: ["0.0.0.0"]
    root_path: "/absolute/path/to/your/project/uploads"  # Set this to the absolute path of the uploads directory
```

### FTP Protocol Configuration

Update your Dionaea configuration to monitor the FTP server:

```yaml
services:
  ftp:
    enabled: yes
    port: 21
    listen_addresses: ["0.0.0.0"]
    root_path: "/absolute/path/to/your/project/ftp"  # Set this to the absolute path of the ftp directory
```

## File Capture Process

1. When a file is uploaded via the webapp, it's stored in both the `uploads/` and `ftp/` directories
2. The file becomes accessible via:
   - HTTP: http://localhost:3000/uploads/[filename]
   - FTP: ftp://localhost:21/[filename]
3. Dionaea will capture access attempts to these files
4. Malicious files are captured and stored in Dionaea's capture directory

## Testing the Integration

1. Make sure your Dionaea honeypot is running first
2. Start the application using `node start.js`
3. Navigate to the Upload Report page at http://localhost:5173/upload-report
4. Upload a test file (e.g., a harmless file with .exe extension)
5. Verify the file appears in both `uploads/` and `ftp/` directories
6. Check Dionaea's logs to confirm capture

## Troubleshooting

If your upload feature isn't working:

1. Check that both the frontend and backend servers are running
2. Ensure the backend server is running on port 3000
3. Make sure Dionaea is properly configured to monitor the directories
4. Check that the directories have proper permissions (read/write)
5. Look at browser console and server logs for error messages

## Security Warnings

- This setup is intentionally vulnerable for educational/testing purposes
- Never deploy this in a production environment
- Always run in an isolated environment (VM, container, etc.)
- Ensure proper network isolation to prevent actual malware from escaping

## Monitoring

You can monitor file captures in Dionaea's logs:

```bash
tail -f /var/log/dionaea/dionaea.log
```

And check captured binaries in Dionaea's capture directory:

```bash
ls -la /var/lib/dionaea/binaries/
```

## Starting the Application

Run the following command to start both the frontend and backend servers:

```bash
node start.js
```

Then access the application at http://localhost:5173
