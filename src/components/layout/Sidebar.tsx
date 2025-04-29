
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Calendar, FileText, Settings, Home, 
  Activity, Search, Grid, ChevronDown, ChevronUp 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    patients: false,
    doctors: false,
    appointments: false
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="bg-white shadow-md w-64 min-h-screen hidden md:block">
      <div className="p-4 border-b">
        <Search className="h-5 w-5 text-gray-500" />
        {/* Vulnerable to XSS - unvalidated input in search box */}
        <input 
          type="text" 
          placeholder="Search..." 
          className="ml-2 outline-none text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const target = document.getElementById('search-results');
              if (target) {
                // Vulnerable: direct HTML injection
                target.innerHTML = `<p>Results for: ${(e.target as HTMLInputElement).value}</p>`;
              }
            }
          }}
        />
      </div>
      <div id="search-results" className="p-2 text-sm"></div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          <li>
            <Link to="/" className="flex items-center text-hospital-blue p-2 rounded hover:bg-hospital-lightblue">
              <Home className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li>
            <div 
              onClick={() => toggleMenu('patients')}
              className="flex items-center justify-between p-2 rounded hover:bg-hospital-lightblue cursor-pointer"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                <span>Patients</span>
              </div>
              {expandedMenus.patients ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            
            {expandedMenus.patients && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/patients" className="block p-1 text-sm hover:text-hospital-blue">
                    All Patients
                  </Link>
                </li>
                <li>
                  <Link to="/patients/add" className="block p-1 text-sm hover:text-hospital-blue">
                    Add New
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <div 
              onClick={() => toggleMenu('doctors')}
              className="flex items-center justify-between p-2 rounded hover:bg-hospital-lightblue cursor-pointer"
            >
              <div className="flex items-center">
                <Activity className="h-5 w-5 mr-3" />
                <span>Doctors</span>
              </div>
              {expandedMenus.doctors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            
            {expandedMenus.doctors && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/doctors" className="block p-1 text-sm hover:text-hospital-blue">
                    All Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/schedule" className="block p-1 text-sm hover:text-hospital-blue">
                    Schedule
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <div 
              onClick={() => toggleMenu('appointments')}
              className="flex items-center justify-between p-2 rounded hover:bg-hospital-lightblue cursor-pointer"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </div>
              {expandedMenus.appointments ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            
            {expandedMenus.appointments && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/appointments" className="block p-1 text-sm hover:text-hospital-blue">
                    View All
                  </Link>
                </li>
                <li>
                  <Link to="/appointments/book" className="block p-1 text-sm hover:text-hospital-blue">
                    Book New
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <Link to="/medical-records" className="flex items-center p-2 rounded hover:bg-hospital-lightblue">
              <FileText className="h-5 w-5 mr-3" />
              <span>Medical Records</span>
            </Link>
          </li>
          
          <li>
            <Link to="/settings" className="flex items-center p-2 rounded hover:bg-hospital-lightblue">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </Link>
          </li>
          
          <li>
            <Link to="/admin" className="flex items-center p-2 rounded hover:bg-hospital-lightblue">
              <Grid className="h-5 w-5 mr-3" />
              <span>Admin Panel</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
