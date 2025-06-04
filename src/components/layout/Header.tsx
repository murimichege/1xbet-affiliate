import React, { useState } from 'react';
import { Button, Icon } from '@/components/ui';

interface HeaderProps {
  activeTab: string;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setSidebarOpen,
  darkMode,
  setDarkMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const formatTabTitle = (tab: string) => {
    return tab.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const notifications = [
    { id: 1, message: "New commission structure available", time: "2 minutes ago", unread: true },
    { id: 2, message: "Payment processed successfully", time: "1 hour ago", unread: true },
    { id: 3, message: "Weekly report is ready", time: "3 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 sticky top-0 z-30 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Icon name="fas fa-bars" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTabTitle(activeTab)}
            </h1>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="fas fa-chevron-right" className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Dashboard
              </span>
            </div>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Mobile App Link */}
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex text-green-600 hover:bg-green-50"
          >
            <Icon name="fab fa-android" className="mr-2" />
            App for Android™
          </Button>
          
          {/* Action Buttons */}
          <Button size="sm" className="hidden md:flex">
            <Icon name="fas fa-question-circle" className="mr-2" />
            ASK A QUESTION
          </Button>
          
          <Button size="sm" variant="secondary" className="hidden lg:flex">
            <Icon name="fas fa-sync-alt" className="mr-2" />
            REFRESH STATISTICS
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Icon name="fas fa-bell" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-50`}>
                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'} ${
                        notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Language Selector */}
         <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded">
           <img 
             src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15'%3E%3Crect width='20' height='5' fill='%23ff0000'/%3E%3Crect y='5' width='20' height='5' fill='%23ffffff'/%3E%3Crect y='10' width='20' height='5' fill='%23000000'/%3E%3C/svg%3E" 
             alt="EN" 
             className="w-5 h-4" 
           />
           <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
             EN
           </span>
           <Icon name="fas fa-chevron-down" className="text-xs text-gray-400" />
         </div>
         
         {/* User Info */}
         <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-800">
           <Icon name="fas fa-user-circle" className="text-gray-400 text-lg" />
           <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
             Aff ID: 3355447
           </span>
         </div>

         {/* Theme Toggle */}
         <Button
           variant="ghost"
           size="sm"
           onClick={() => setDarkMode(!darkMode)}
           className="relative overflow-hidden"
         >
           <Icon 
             name={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} 
             className={`transition-all duration-300 ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
           />
         </Button>

         {/* Settings Menu */}
         <Button variant="ghost" size="sm">
           <Icon name="fas fa-cog" />
         </Button>
       </div>
     </div>

     {/* Mobile Actions Bar */}
     <div className="mt-4 flex items-center justify-between md:hidden">
       <Button size="sm" variant="secondary" className="flex-1 mr-2">
         <Icon name="fas fa-question-circle" className="mr-2" />
         Help
       </Button>
       <Button size="sm" className="flex-1 ml-2">
         <Icon name="fas fa-sync-alt" className="mr-2" />
         Refresh
       </Button>
     </div>
   </header>
 );
};

export default Header;