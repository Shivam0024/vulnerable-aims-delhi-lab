
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';

const Navbar: React.FC = () => {
  // Vulnerable to XSS: directly renders the URL parameter without sanitization
  const welcomeMessage = new URLSearchParams(window.location.search).get('welcome') || '';
  
  return (
    <nav className="bg-hospital-blue text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6 md:hidden cursor-pointer" />
          <Link to="/dashboard" className="font-bold text-2xl">AIIMS Hospital</Link>
        </div>
        
        {/* Vulnerable to XSS: directly renders HTML from URL parameter */}
        {welcomeMessage && (
          <div className="hidden md:block" dangerouslySetInnerHTML={{ __html: welcomeMessage }} />
        )}
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-6 w-6 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-hospital-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <Link to="/login" className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="hidden md:inline">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
