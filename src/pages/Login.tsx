
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          AIIMS Hospital
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hospital Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
      
      {/* Vulnerable: XSS through query parameters */}
      <div 
        className="mt-8 text-center text-sm text-gray-500"
        dangerouslySetInnerHTML={{ 
          __html: new URLSearchParams(window.location.search).get('notice') || '' 
        }}
      />
    </div>
  );
};

export default Login;
