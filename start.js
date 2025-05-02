
const { spawn } = require('child_process');
const path = require('path');

// Function to handle error for processes
function handleProcessError(process, name) {
  process.on('error', (err) => {
    console.error(`Error starting ${name}:`, err);
  });
}

// Start the frontend development server
const frontendProcess = spawn('npm', ['run', 'dev'], { 
  stdio: 'inherit',
  shell: true
});
handleProcessError(frontendProcess, 'frontend');

// Start the backend server
const backendProcess = spawn('node', [path.join(__dirname, 'src/server/index.js')], { 
  stdio: 'inherit',
  shell: true
});
handleProcessError(backendProcess, 'backend');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Terminating all processes...');
  frontendProcess.kill('SIGINT');
  backendProcess.kill('SIGINT');
  process.exit(0);
});

console.log('Starting both frontend and backend servers...');
console.log('Press Ctrl+C to stop both servers.');

// Handle child process exits
frontendProcess.on('exit', (code) => {
  console.log(`Frontend process exited with code ${code || 0}`);
  if (code !== 0) {
    console.error('Frontend process exited with error');
  }
  backendProcess.kill();
  process.exit(code || 0);
});

backendProcess.on('exit', (code) => {
  console.log(`Backend process exited with code ${code || 0}`);
  if (code !== 0) {
    console.error('Backend process exited with error');
  }
  frontendProcess.kill();
  process.exit(code || 0);
});
