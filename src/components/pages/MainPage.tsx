import React, { useState, useEffect } from 'react';
import { StatCard, FilterRow } from '@/components/common';
import { FilterConfig, StatCardData } from '@/types/common';
import { formatCurrency } from '@/utils/helpers';
import { Card } from '@/components/ui';

interface MainPageProps {
  darkMode: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatCardData[]>([
    { id: '1', label: 'AVAILABLE TO WITHDRAW', value: '$1,247', icon: 'fas fa-dollar-sign', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: '2', label: 'YESTERDAY', value: '$0', icon: 'fas fa-calendar-day', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: '3', label: 'CURRENT MONTH', value: '$1,247', icon: 'fas fa-chart-line', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: '4', label: '30 DAYS', value: '$1,247', icon: 'fas fa-calendar-alt', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: '5', label: 'TOTAL', value: '$2,494', icon: 'fas fa-chart-bar', color: 'text-cyan-600', bgColor: 'bg-cyan-50' }
  ]);

  const mainFilters: FilterConfig[] = [
    { 
      label: 'Time interval', 
      name: 'timeInterval', 
      type: 'select', 
      options: ['1 month', '3 months', '6 months', '1 year'], 
      defaultValue: '1 month' 
    },
    { 
      label: 'Currency', 
      name: 'currency', 
      type: 'select', 
      options: ['USD', 'EUR', 'GBP', 'BTC'], 
      defaultValue: 'USD' 
    }
  ];

  const handleFiltersApply = (filters: Record<string, string>) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Applied filters:', filters);
      setLoading(false);
    }, 1000);
  };

  const handleStatClick = (statId: string) => {
    console.log('Stat clicked:', statId);
    // Navigate to detailed view or show modal
  };

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.id === '2' ? formatCurrency(Math.random() * 100) : stat.value
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome back! 👋
          </h2>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's what's happening with your affiliate account today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
            Active
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((card) => (
          <StatCard 
            key={card.id} 
            data={card} 
            darkMode={darkMode}
            loading={loading}
            onClick={() => handleStatClick(card.id)}
          />
        ))}
      </div>

      {/* Filters and Charts */}
      <Card darkMode={darkMode} className="p-6">
        <div className="mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Performance Analytics
          </h3>
          <FilterRow 
            filters={mainFilters} 
            darkMode={darkMode}
            onApply={handleFiltersApply}
            loading={loading}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Conversion Statistics Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Conversion Statistics
              </h4>
              <div className="flex items-center space-x-2">
                <button className={`text-sm px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  Views
                </button>
                <button className={`text-sm px-3 py-1 rounded ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                  Clicks
                </button>
                <button className={`text-sm px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  Conversions
                </button>
              </div>
            </div>
            <div className={`h-64 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg flex items-center justify-center relative overflow-hidden`}>
              {loading ? (
                <div className="animate-pulse">
                  <div className={`h-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-32 mb-2`}></div>
                  <div className={`h-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-24`}></div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}>
                      <i className="fas fa-chart-line text-2xl text-gray-400"></i>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-2`}>
                    Interactive chart will display here
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    Conversion rate: 3.2% ↑
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Registration Statistics Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Registration Statistics
              </h4>
              <div className="flex items-center space-x-2">
                <button className={`text-sm px-3 py-1 rounded ${darkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}>
                  Registrations
                </button>
                <button className={`text-sm px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  Deposits
                </button>
              </div>
            </div>
            <div className={`h-64 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg flex items-center justify-center relative overflow-hidden`}>
              {loading ? (
                <div className="animate-pulse">
                  <div className={`h-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-32 mb-2`}></div>
                  <div className={`h-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-24`}></div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}>
                      <i className="fas fa-chart-bar text-2xl text-gray-400"></i>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-2`}>
                    Registration analytics will display here
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    New registrations: 24 ↑
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card darkMode={darkMode} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-link text-blue-600 text-xl"></i>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Generate New Link
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Create affiliate links for campaigns
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-tags text-green-600 text-xl"></i>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Create Promo Code
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Generate promotional codes
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <i className="fas fa-file-alt text-purple-600 text-xl"></i>
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                View Reports
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Access detailed analytics
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card darkMode={darkMode} className="p-6">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New registration', details: 'User registered via link #5573518', time: '2 minutes ago', type: 'success' },
            { action: 'Commission earned', details: '$15.50 from user deposit', time: '1 hour ago', type: 'success' },
            { action: 'Link generated', details: 'New affiliate link created for Facebook', time: '3 hours ago', type: 'info' },
            { action: 'Payment processed', details: 'Withdrawal of $500 completed', time: '1 day ago', type: 'success' }
          ].map((activity, index) => (
            <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activity.action}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activity.details}
                </p>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MainPage;