
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Users, Shield, FilePlus } from 'lucide-react';

const Admin: React.FC = () => {
  const [logSettings, setLogSettings] = useState({
    enableErrorLogs: true,
    enableAccessLogs: true,
    enableAuditTrail: false,
    logRetentionDays: 30
  });

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'staff'
  });

  const handleLogSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setLogSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    // Vulnerable: No CSRF protection
    console.log("Saving settings:", logSettings);
    alert("Settings saved successfully");
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Vulnerable: Password strength not validated
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Vulnerable: Direct console logging of credentials
    console.log("Creating new user:", newUser);
    alert(`User ${newUser.username} created successfully`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="bg-hospital-blue p-2 rounded-full text-white">
            <Settings className="h-6 w-6" />
          </div>
        </div>

        <Tabs defaultValue="system-settings">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system-settings" className="mt-4">
            <div className="border rounded-md p-6 bg-white">
              <h2 className="text-lg font-semibold mb-4">System Logging Configuration</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableErrorLogs"
                    name="enableErrorLogs"
                    checked={logSettings.enableErrorLogs}
                    onChange={handleLogSettingsChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="enableErrorLogs">Enable Error Logs</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableAccessLogs"
                    name="enableAccessLogs"
                    checked={logSettings.enableAccessLogs}
                    onChange={handleLogSettingsChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="enableAccessLogs">Enable Access Logs</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableAuditTrail"
                    name="enableAuditTrail"
                    checked={logSettings.enableAuditTrail}
                    onChange={handleLogSettingsChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="enableAuditTrail">Enable Audit Trail</label>
                </div>
                
                <div>
                  <label htmlFor="logRetentionDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Log Retention Period (days)
                  </label>
                  <input
                    type="number"
                    id="logRetentionDays"
                    name="logRetentionDays"
                    value={logSettings.logRetentionDays}
                    onChange={handleLogSettingsChange}
                    min={1}
                    max={365}
                    className="w-full sm:w-40 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveSettings} 
                    className="bg-hospital-blue hover:bg-blue-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="user-management" className="mt-4">
            <div className="border rounded-md p-6 bg-white">
              <h2 className="text-lg font-semibold mb-4">Create New User</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={newUser.username}
                      onChange={handleNewUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                    {/* Vulnerable: SQL Injection possible with unvalidated input */}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleNewUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="staff">Staff</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleNewUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                    {/* Vulnerable: No password strength requirements */}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={newUser.confirmPassword}
                      onChange={handleNewUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-hospital-blue hover:bg-blue-700">
                    <Users className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </div>
              </form>
              
              <div className="mt-10">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <FilePlus className="h-4 w-4 mr-2" />
                    Export User List
                  </Button>
                  <Button variant="outline" className="justify-start text-hospital-red hover:text-red-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Reset All Passwords
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
