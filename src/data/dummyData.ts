export const WEBSITES = [
    { 
      id: '4429642', 
      url: 'https://mysite.com', 
      category: 'Sports predictions', 
      language: 'English', 
      status: 'active', 
      createdAt: '2025-01-15' 
    },
    { 
      id: '4429643', 
      url: 'https://sportsnews.com', 
      category: 'Sports news', 
      language: 'English', 
      status: 'active', 
      createdAt: '2025-01-10' 
    },
    { 
      id: '4429644', 
      url: 'https://betanalysis.com', 
      category: 'Bookmakers and bets', 
      language: 'Spanish', 
      status: 'active', 
      createdAt: '2025-01-05' 
    }
  ];
  
  export const AFFILIATE_LINKS = [
    {
      id: '5573518',
      website: 'https://www.facebook.com/',
      landingPage: '/live',
      campaign: 'World wide',
      generatedLink: 'https://refpa3267686.top/L?tag=d_4429642m_1599c_&site=4429642&ad=1599',
      currency: 'USD',
      status: 'hidden',
      clicks: 1247,
      conversions: 42,
      createdAt: '2025-01-15'
    }
  ];
  
  export const PROMO_CODES = [
    {
      id: '7368530',
      website: 'https://1xbet.co.ke',
      currency: 'USD',
      promoCode: '1x_3001474',
      btag: 'd_4371905m_1599c_1x_3001474',
      campaign: 'World Wide',
      usage: 24,
      maxUsage: 1000,
      isActive: true,
      createdAt: '2025-01-15'
    }
  ];
  
  export const PAYMENT_RECORDS = [
    { 
      id: '1', 
      currency: 'KES', 
      date: '2025-05-15', 
      payout: 65000, 
      revenue: 150000, 
      balance: 153500, 
      status: 'Completed', 
      method: 'M-Pesa', 
      transactionId: 'TXN987654' 
    },
    { 
      id: '2', 
      currency: 'KES', 
      date: '2025-04-15', 
      payout: 35000, 
      revenue: 90000, 
      balance: 87500, 
      status: 'Completed', 
      method: 'Bank Transfer', 
      transactionId: 'TXN987653' 
    },
    { 
      id: '3', 
      currency: 'KES', 
      date: '2025-03-15', 
      payout: 20000, 
      revenue: 70000, 
      balance: 67500, 
      status: 'Processing', 
      method: 'Airtel Money', 
      transactionId: 'TXN987652' 
    },
    { 
      id: '4', 
      currency: 'KES', 
      date: '2025-02-15', 
      payout: 15000, 
      revenue: 50000, 
      balance: 47000, 
      status: 'Failed', 
      method: 'M-Pesa', 
      transactionId: 'TXN987651' 
    }
  ];
  
  
  export const MAIN_PAGE_STATS = [
    { 
      id: '1', 
      label: 'AVAILABLE TO WITHDRAW', 
      value: '0', 
      icon: 'fas fa-money-bill-wave', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    { 
      id: '2', 
      label: 'YESTERDAY', 
      value: '0', 
      icon: 'fas fa-calendar-day', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      id: '3', 
      label: 'CURRENT MONTH', 
      value: '0', 
      icon: 'fas fa-chart-line', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
    { 
      id: '4', 
      label: '30 DAYS', 
      value: '0', 
      icon: 'fas fa-calendar-alt', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      id: '5', 
      label: 'TOTAL EARNED', 
      value: '0', 
      icon: 'fas fa-trophy', 
      color: 'text-cyan-600', 
      bgColor: 'bg-cyan-50' 
    }

  ];
  export const STATS_TABLE_DATA = [
  {
    currency: 'KES',
    views: 28450,
    clicks: 3240,
    directLinks: 890,
    registrations: 156,
    newDepositors: 89,
    companyProfit: 245000.50,
    rs: 18.5,
    cpa: 1850.00,
    commissionAmount: 36750.75
  },
  {
    currency: 'USD',
    views: 15200,
    clicks: 1890,
    directLinks: 420,
    registrations: 78,
    newDepositors: 45,
    companyProfit: 18500.25,
    rs: 12.4,
    cpa: 125.00,
    commissionAmount: 2775.50
  },
  {
    currency: 'UGX',
    views: 12680,
    clicks: 1456,
    directLinks: 312,
    registrations: 62,
    newDepositors: 34,
    companyProfit: 8950000.00,
    rs: 11.5,
    cpa: 48500.00,
    commissionAmount: 1342500.00
  },
  {
    currency: 'TZS',
    views: 9850,
    clicks: 1124,
    directLinks: 245,
    registrations: 48,
    newDepositors: 28,
    companyProfit: 12450000.00,
    rs: 10.2,
    cpa: 65000.00,
    commissionAmount: 1867500.00
  },
  {
    currency: 'EUR',
    views: 5670,
    clicks: 678,
    directLinks: 156,
    registrations: 23,
    newDepositors: 14,
    companyProfit: 4250.75,
    rs: 8.9,
    cpa: 95.50,
    commissionAmount: 637.61
  }
];
export const mockCommissions = [
  {
      currency: 'USD',
      structure: 'Refferal',
      groupName: 'Africa',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      description: 'Level 1|3%; Negative commission: Yes; (2017-03-20)',
      id: '',
      isActive: false
  },
  {
      currency: 'USD',
      structure: 'Revenue Share',
      groupName: 'Africa',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      description: 'Commission percentage: 25%; Negative commission: Yes; Administrator: 0%; MLM calculation type: Revenue; (2016-10-20)',
      id: '',
      isActive: false
  }
];
  export const RECENT_ACTIVITIES = [
    { 
      action: 'New registration', 
      details: 'User registered via link #5573518', 
      time: '2 minutes ago', 
      type: 'success' 
    },
    { 
      action: 'Commission earned', 
      details: '$15.50 from user deposit', 
      time: '1 hour ago', 
      type: 'success' 
    },
    { 
      action: 'Link generated', 
      details: 'New affiliate link created for Facebook', 
      time: '3 hours ago', 
      type: 'info' 
    },
    { 
      action: 'Payment processed', 
      details: 'Withdrawal of $500 completed', 
      time: '1 day ago', 
      type: 'success' 
    }
  ];
  
  // Filter configurations
  export const FILTER_CONFIGS = {
    affiliate: [
      { 
        label: 'Website', 
        name: 'website', 
        type: 'select', 
        options: ['https://www.facebook.com/', 'https://www.instagram.com/', 'https://www.youtube.com/'], 
        defaultValue: 'https://www.facebook.com/' 
      },
      { 
        label: 'Currency', 
        name: 'currency', 
        type: 'select', 
        options: ['USD', 'EUR', 'GBP', 'BTC'], 
        defaultValue: 'USD' 
      },
      { 
        label: 'Campaign', 
        name: 'campaign', 
        type: 'select', 
        options: ['World Wide', 'Europe', 'Asia', 'Africa'], 
        defaultValue: 'World Wide' 
      },
      { 
        label: 'Landing page', 
        name: 'landingPage', 
        type: 'text', 
        defaultValue: '/live',
        placeholder: '/live, /sports, /casino'
      },
    ],
    
    payment: [
      { 
        label: 'Currency', 
        name: 'currency', 
        type: 'select', 
        options: ['USD', 'EUR', 'GBP', 'BTC'], 
        defaultValue: 'USD' 
      },
      { 
        label: 'Time interval', 
        name: 'timeInterval', 
        type: 'select', 
        options: ['Exact period', 'Last 7 days', 'Last 30 days', 'Last 3 months'], 
        defaultValue: 'Exact period' 
      },
      { 
        label: 'From', 
        name: 'dateFrom', 
        type: 'date', 
        defaultValue: '2025-06-04' 
      },
      { 
        label: 'To', 
        name: 'dateTo', 
        type: 'date', 
        defaultValue: '2025-06-04' 
      },
      { 
        label: 'Status', 
        name: 'status', 
        type: 'select', 
        options: ['All', 'Pending', 'Processing', 'Completed', 'Failed'], 
        defaultValue: 'All' 
      }
    ],
  
    website: [
      { 
        label: 'Website URL', 
        name: 'website', 
        type: 'text', 
        placeholder: 'Enter your website\'s URL. Example: mysite.com' 
      },
      { 
        label: 'Site category', 
        name: 'category', 
        type: 'select', 
        options: ['Sports predictions', 'Sports news', 'Bookmakers and bets', 'Sports broadcasts', 'Casino', 'Sports', 'Other', 'Facebook'] 
      },
      { 
        label: 'Language', 
        name: 'language', 
        type: 'select', 
        options: ['English', 'Spanish', 'French', 'German', 'Russian', 'Chinese'] 
      }
    ],
  
    report: [
      { 
        label: 'Currency', 
        name: 'currency', 
        type: 'select', 
        options: ['USD', 'EUR', 'GBP', 'BTC'], 
        defaultValue: 'USD' 
      },
      { 
        label: 'Website', 
        name: 'website', 
        type: 'select', 
        options: ['All', 'https://mysite.com', 'https://sportsnews.com'], 
        defaultValue: 'All' 
      },
      { 
        label: 'Marketing tool ID', 
        name: 'marketingToolId', 
        type: 'text', 
        placeholder: 'Enter tool ID' 
      },
      { 
        label: 'Time interval', 
        name: 'timeInterval', 
        type: 'select', 
        options: ['Exact period', 'Last 7 days', 'Last 30 days', 'Last 3 months'], 
        defaultValue: 'Exact period' 
      },
      { 
        label: 'Registration Source', 
        name: 'registrationSource', 
        type: 'select', 
        options: ['Select...', 'Affiliate Link', 'Promo Code', 'Direct', 'Social Media'], 
        defaultValue: 'Select...' 
      }
    ],
  
    player: [
      { 
        label: 'Currency', 
        name: 'currency', 
        type: 'select', 
        options: ['USD', 'EUR', 'GBP', 'BTC'], 
        defaultValue: 'USD' 
      },
      { 
        label: 'Country', 
        name: 'country', 
        type: 'select', 
        options: ['Select...', 'United States', 'United Kingdom', 'Germany', 'Canada', 'Australia'], 
        defaultValue: 'Select...' 
      },
      { 
        label: 'Marketing tool ID', 
        name: 'marketingToolId', 
        type: 'text', 
        placeholder: 'Enter tool ID' 
      },
      { 
        label: 'Website', 
        name: 'website', 
        type: 'select', 
        options: ['All', 'https://mysite.com', 'https://sportsnews.com'], 
        defaultValue: 'All' 
      },
      { 
        label: 'Time interval', 
        name: 'timeInterval', 
        type: 'select', 
        options: ['Exact period', 'Last 7 days', 'Last 30 days', 'Last 3 months'], 
        defaultValue: 'Exact period' 
      },
      { 
        label: 'Campaign', 
        name: 'campaign', 
        type: 'select', 
        options: ['Select...', 'World Wide', 'Mobile App'], 
        defaultValue: 'Select...' 
      },
      { 
        label: 'Player ID', 
        name: 'playerId', 
        type: 'text', 
        placeholder: 'Enter player ID' 
      },
      { 
        label: 'Registration Source', 
        name: 'registrationSource', 
        type: 'select', 
        options: ['Select...', 'Affiliate Link', 'Promo Code', 'Direct'], 
        defaultValue: 'Select...' 
      }
    ],
  
    main: [
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
    ],
  
    summary: [
      { 
        label: 'Currency', 
        name: 'currency', 
        type: 'select', 
        options: ['USD', 'EUR', 'GBP', 'BTC'], 
        defaultValue: 'USD' 
      },
      { 
        label: 'Website', 
        name: 'website', 
        type: 'select', 
        options: ['All', 'https://mysite.com', 'https://sportsnews.com'], 
        defaultValue: 'All' 
      },
      { 
        label: 'Marketing tool ID', 
        name: 'marketingToolId', 
        type: 'text', 
        placeholder: 'Enter tool ID' 
      },
      { 
        label: 'Time interval', 
        name: 'timeInterval', 
        type: 'select', 
        options: ['Exact period', 'Last 7 days', 'Last 30 days', 'Last 3 months'], 
        defaultValue: 'Exact period' 
      }
    ]
  };
  
  // Summary metrics configuration
  export const SUMMARY_METRICS = [
    { 
      key: 'views', 
      label: 'Views', 
      icon: 'fas fa-eye', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      key: 'clicks', 
      label: 'Clicks', 
      icon: 'fas fa-mouse-pointer', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    { 
      key: 'directLinks', 
      label: 'Direct links', 
      icon: 'fas fa-link', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      key: 'clicksViews', 
      label: 'Clicks/Views', 
      icon: 'fas fa-percentage', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
    { 
      key: 'registrations', 
      label: 'Registrations', 
      icon: 'fas fa-user-plus', 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50' 
    },
    { 
      key: 'regClicksRatio', 
      label: 'Registrations/clicks ratio', 
      icon: 'fas fa-chart-pie', 
      color: 'text-pink-600', 
      bgColor: 'bg-pink-50' 
    },
    { 
      key: 'regWithDeposits', 
      label: 'Registrations with deposits', 
      icon: 'fas fa-wallet', 
      color: 'text-cyan-600', 
      bgColor: 'bg-cyan-50' 
    },
    { 
      key: 'regDepositRatio', 
      label: 'Registrations with deposits/Registrations ratio', 
      icon: 'fas fa-chart-bar', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50' 
    },
    { 
      key: 'totalNewDepositAmount', 
      label: 'Total new deposit amount', 
      icon: 'fas fa-dollar-sign', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    { 
      key: 'newDepositors', 
      label: 'New depositors', 
      icon: 'fas fa-users', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      key: 'accountsWithDeposits', 
      label: 'Accounts with deposits', 
      icon: 'fas fa-credit-card', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      key: 'sumAllDeposits', 
      label: 'Sum of all deposits', 
      icon: 'fas fa-coins', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50' 
    },
    { 
      key: 'revenue', 
      label: 'Revenue', 
      icon: 'fas fa-chart-line', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    { 
      key: 'numberOfDeposits', 
      label: 'Number of deposits', 
      icon: 'fas fa-hash', 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-50' 
    },
    { 
      key: 'activePlayers', 
      label: 'Active players', 
      icon: 'fas fa-user-check', 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50' 
    },
    { 
      key: 'avgProfitPerPlayer', 
      label: 'Average profit per player', 
      icon: 'fas fa-calculator', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    }
  ];
  

  
  // Currency options
  export const CURRENCIES = ['USD', 'EUR', 'GBP', 'BTC'];
  
  // Website categories
  export const WEBSITE_CATEGORIES = [
    'Sports predictions',
    'Sports news', 
    'Bookmakers and bets',
    'Sports broadcasts',
    'Casino',
    'Sports',
    'Other',
    'Facebook'
  ];
  
  // Languages
  export const LANGUAGES = [
    'English',
    'Spanish',
    'French',
    'German',
    'Russian',
    'Chinese'
  ];
  
  // Campaign options
  export const CAMPAIGNS = [
    'World Wide',
    'Mobile App'
  ];
  
  // Website URLs for forms
  export const WEBSITE_URLS = [
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://www.youtube.com/',
    'https://1xbet.co.ke',
    'https://1xbet.com'
  ];
  
  // Time intervals
  export const TIME_INTERVALS = [
    'Exact period',
    'Last 7 days',
    'Last 30 days',
    'Last 3 months',
    '1 month',
    '3 months',
    '6 months',
    '1 year'
  ];
  
  // Countries
  export const COUNTRIES = [
    'Select...',
    'United States',
    'United Kingdom',
    'Germany',
    'Canada',
    'Australia'
  ];
  
  // Registration sources
  export const REGISTRATION_SOURCES = [
    'Select...',
    'Affiliate Link',
    'Promo Code',
    'Direct',
    'Social Media'
  ];
  
  // Status options
  export const STATUS_OPTIONS = [
    'All',
    'Pending',
    'Processing',
    'Completed',
    'Failed',
    'Active',
    'Hidden'
  ];
  export const MOCK_PLAYER_REPORT_DATA = [
    {
      websiteId: '4429642',
      website: 'https://mysite.com',
      playerId: 'KE-001',
      registrationDate: '2025-06-01',
      country: 'Kenya',
      sumOfAllDeposits: 54000,
      companyProfit: 13500
    },
    {
      websiteId: '4429643',
      website: 'https://sportsnews.com',
      playerId: 'KE-002',
      registrationDate: '2025-06-02',
      country: 'Kenya',
      sumOfAllDeposits: 32000,
      companyProfit: 7500
    },
    {
      websiteId: '4429644',
      website: 'https://betanalysis.com',
      playerId: 'KE-003',
      registrationDate: '2025-06-03',
      country: 'Kenya',
      sumOfAllDeposits: 71500,
      companyProfit: 20000
    },
    {
      websiteId: '4429642',
      website: 'https://mysite.com',
      playerId: 'KE-004',
      registrationDate: '2025-06-03',
      country: 'Kenya',
      sumOfAllDeposits: 28000,
      companyProfit: 6700
    },
    {
      websiteId: '4429643',
      website: 'https://sportsnews.com',
      playerId: 'KE-005',
      registrationDate: '2025-06-04',
      country: 'Kenya',
      sumOfAllDeposits: 89000,
      companyProfit: 22500
    }
  ];
  
  