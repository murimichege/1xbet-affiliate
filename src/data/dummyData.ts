// dummyData.js
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
      status: 'hidden', 
      createdAt: '2025-01-05' 
    }
  ];
  
  export const AFFILIATE_LINKS = [
    {
      id: '5573518',
      website: 'https://www.facebook.com/',
      landingPage: '/live',
      subId: '',
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
      currency: 'USD', 
      date: '2025-05-15', 
      payout: 500, 
      revenue: 1200, 
      balance: 1247, 
      status: 'Completed', 
      method: 'Bank Transfer', 
      transactionId: 'TXN123456' 
    },
    { 
      id: '2', 
      currency: 'USD', 
      date: '2025-04-15', 
      payout: 300, 
      revenue: 800, 
      balance: 747, 
      status: 'Completed', 
      method: 'PayPal', 
      transactionId: 'TXN123455' 
    },
    { 
      id: '3', 
      currency: 'USD', 
      date: '2025-03-15', 
      payout: 250, 
      revenue: 600, 
      balance: 447, 
      status: 'Processing', 
      method: 'Crypto', 
      transactionId: 'TXN123454' 
    },
    { 
      id: '4', 
      currency: 'EUR', 
      date: '2025-02-15', 
      payout: 200, 
      revenue: 500, 
      balance: 197, 
      status: 'Failed', 
      method: 'Bank Transfer', 
      transactionId: 'TXN123453' 
    }
  ];
  
  export const MAIN_PAGE_STATS = [
    { 
      id: '1', 
      label: 'AVAILABLE TO WITHDRAW', 
      value: '$1,247', 
      icon: 'fas fa-dollar-sign', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      id: '2', 
      label: 'YESTERDAY', 
      value: '$0', 
      icon: 'fas fa-calendar-day', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      id: '3', 
      label: 'CURRENT MONTH', 
      value: '$1,247', 
      icon: 'fas fa-chart-line', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
    { 
      id: '4', 
      label: '30 DAYS', 
      value: '$1,247', 
      icon: 'fas fa-calendar-alt', 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50' 
    },
    { 
      id: '5', 
      label: 'TOTAL', 
      value: '$2,494', 
      icon: 'fas fa-chart-bar', 
      color: 'text-cyan-600', 
      bgColor: 'bg-cyan-50' 
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
      { 
        label: 'Sub ID', 
        name: 'subId', 
        type: 'text',
        placeholder: 'Optional tracking ID'
      }
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
        options: ['Select...', 'World Wide', 'Europe', 'Asia', 'Africa'], 
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
  
  // Payment methods and related data
  export const PAYMENT_METHODS = [
    { value: 'Bank Transfer', label: 'Bank Transfer', processingTime: '3-5 business days' },
    { value: 'PayPal', label: 'PayPal', processingTime: '1-2 business days' },
    { value: 'Skrill', label: 'Skrill', processingTime: '1-2 business days' },
    { value: 'Crypto', label: 'Cryptocurrency', processingTime: 'Within 24 hours' }
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
    'Europe',
    'Asia',
    'Africa'
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