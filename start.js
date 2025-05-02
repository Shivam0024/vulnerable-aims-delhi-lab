
const { spawn } = require('child_process');
const path = require('path');

// Start the frontend development server
const frontendProcess = spawn('npm', ['run', 'dev'], { 
  stdio: 'inherit',
  shell: true
});

// Start the backend server
const backendProcess = spawn('node', [path.join(__dirname, 'src/server/index.js')], { 
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  frontendProcess.kill('SIGINT');
  backendProcess.kill('SIGINT');
  process.exit(0);
});

console.log('Starting both frontend and backend servers...');
console.log('Press Ctrl+C to stop both servers.');

// Handle child process exits
frontendProcess.on('exit', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  backendProcess.kill();
  process.exit(code || 0);
});

backendProcess.on('exit', (code) => {
  console.log(`Backend process exited with code ${code}`);
  frontendProcess.kill();
  process.exit(code || 0);
});
