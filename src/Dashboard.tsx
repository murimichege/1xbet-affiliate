import React, { useState } from 'react';
import { useSidebar } from '@/hooks';
import { Header, Footer, Sidebar } from './components/layout';
import { Card, Icon } from '@/components/ui';
import { 
  MainPage,
  WebsitesPage,
  PaymentsPage,
  AffiliateLinksPage, 
  PromoCodesPage, 
  SummaryPage, 
  FullReportPage, 
  PlayerReportPage,
  CommissionStructurePage
} from '@/components/pages';
import { NAVIGATION_ITEMS, MARKETING_ITEMS, REPORT_ITEMS } from '@/utils/constants';

const Dashboard: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState('main');

  const renderContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainPage />;
      case 'websites':
        return <WebsitesPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'affiliate-links':
        return <AffiliateLinksPage />;
      case 'commission':
        return <CommissionStructurePage />;
      case 'promo-codes':
        return <PromoCodesPage />;
      case 'summary':
        return <SummaryPage />;
      case 'full-report':
        return <FullReportPage />;
      case 'player-report':
        return <PlayerReportPage />;
      default:
        return <ComingSoonPage title="Page Not Found" />;
    }
  };

  const ComingSoonPage: React.FC<{ title: string }> = ({ title }) => (
    <Card className="p-8 text-center">
      <Icon name="fas fa-construction" className="text-4xl text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        This section is under development.
      </p>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="flex flex-1">
        <Sidebar
          navigationItems={NAVIGATION_ITEMS}
          marketingItems={MARKETING_ITEMS}
          reportItems={REPORT_ITEMS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
          }`}
        >
          <Header
            activeTab={activeTab}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        <Footer />
      </div>

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
