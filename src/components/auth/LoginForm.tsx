
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vulnerable: Authentication bypass
    // This is an intentionally vulnerable login validation
    // In a real app, you'd NEVER do this - always use secure authentication
    if (credentials.username.toLowerCase() === 'admin') {
      console.log("Login successful (but vulnerable)");
      localStorage.setItem('user', JSON.stringify({ 
        name: 'Admin User', 
        role: 'administrator',
        token: 'fake-jwt-token'
      }));
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!",
      });
      navigate('/');
    } else {
      // Vulnerable: SQL Injection risk in a real backend
      // In a real app, this would send to an API, but we'll simulate it
      const sqlQuery = `SELECT * FROM users WHERE username='${credentials.username}' AND password='${credentials.password}'`;
      console.log("SQL Query (vulnerable to SQL injection):", sqlQuery);
      
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-hospital-blue">Login to AIMS Hospital</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-hospital-blue focus:border-hospital-blue"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-hospital-blue focus:border-hospital-blue"
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={credentials.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-hospital-blue focus:ring-hospital-blue border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-hospital-blue hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full bg-hospital-blue text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hospital-blue"
          >
            Log in
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>
        <a href="#" className="text-hospital-blue hover:underline ml-1">
          Contact administrator
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
