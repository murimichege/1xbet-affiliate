import React, { useState } from 'react';
import { useTheme, useSidebar } from '@/hooks';
import   Header from '@/components/layout/Header';
import { Card, Icon } from '@/components/ui';
import { 
  MainPage,
  WebsitesPage,
  PaymentsPage,
  AffiliateLinksPage, 
  PromoCodesPage, 
  SummaryPage, 
  FullReportPage, 
  PlayerReportPage 
} from '@/components/pages';
import { NAVIGATION_ITEMS, MARKETING_ITEMS, REPORT_ITEMS } from '@/utils/constants';
import Sidebar from './components/layout/Sidebar';

const Dashboard: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState('main');

  const renderContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainPage darkMode={darkMode} />;
      case 'websites':
        return <WebsitesPage darkMode={darkMode} />;
      case 'payments':
        return <PaymentsPage darkMode={darkMode} />;
      case 'affiliate-links':
        return <AffiliateLinksPage darkMode={darkMode} />;
      case 'promo-codes':
        return <PromoCodesPage darkMode={darkMode} />;
      case 'summary':
        return <SummaryPage darkMode={darkMode} />;
      case 'full-report':
        return <FullReportPage darkMode={darkMode} />;
      case 'player-report':
        return <PlayerReportPage darkMode={darkMode} />;
      case 'account':
        return <ComingSoonPage darkMode={darkMode} title="Account Settings" />;
      case 'contacts':
        return <ComingSoonPage darkMode={darkMode} title="Contacts" />;
      case 'media':
        return <ComingSoonPage darkMode={darkMode} title="Media Library" />;
      case 'marketing-tools':
        return <ComingSoonPage darkMode={darkMode} title="Marketing Tools" />;
      case 'sub-affiliate':
        return <ComingSoonPage darkMode={darkMode} title="Sub-affiliate Report" />;
      default:
        return <ComingSoonPage darkMode={darkMode} title="Page Not Found" />;
    }
  };

  // Coming Soon Component for unimplemented pages
  const ComingSoonPage: React.FC<{ darkMode: boolean; title: string }> = ({ darkMode, title }) => (
    <Card darkMode={darkMode} className="p-8 text-center">
      <Icon name="fas fa-construction" className="text-4xl text-gray-400 mb-4" />
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
        {title}
      </h3>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        This section is under development.
      </p>
    </Card>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <div className="flex">
        <Sidebar
          navigationItems={NAVIGATION_ITEMS}
          marketingItems={MARKETING_ITEMS}
          reportItems={REPORT_ITEMS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            activeTab={activeTab}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;