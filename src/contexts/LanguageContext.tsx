import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', mr: 'डॅशबोर्ड', hi: 'डैशबोर्ड' },
  modes: { en: 'Modes', mr: 'मोड', hi: 'मोड' },
  storage: { en: 'Storage', mr: 'साठवण', hi: 'भंडारण' },
  crops: { en: 'Crops', mr: 'पिके', hi: 'फसलें' },
  alerts: { en: 'Alerts', mr: 'सूचना', hi: 'अलर्ट' },
  history: { en: 'History', mr: 'इतिहास', hi: 'इतिहास' },
  
  // Dashboard
  liveData: { en: 'Live Farm Data', mr: 'थेट शेत डेटा', hi: 'लाइव फार्म डेटा' },
  temperature: { en: 'Temperature', mr: 'तापमान', hi: 'तापमान' },
  humidity: { en: 'Humidity', mr: 'आर्द्रता', hi: 'नमी' },
  soilMoisture: { en: 'Soil Moisture', mr: 'माती ओलावा', hi: 'मिट्टी नमी' },
  fertilizerLevel: { en: 'Fertilizer', mr: 'खत', hi: 'उर्वरक' },
  pesticideLevel: { en: 'Pesticide', mr: 'कीटकनाशक', hi: 'कीटनाशक' },
  robotStatus: { en: 'Robot Status', mr: 'रोबोट स्थिती', hi: 'रोबोट स्थिति' },
  online: { en: 'Online', mr: 'ऑनलाइन', hi: 'ऑनलाइन' },
  offline: { en: 'Offline', mr: 'ऑफलाइन', hi: 'ऑफ़लाइन' },
  working: { en: 'Working', mr: 'काम करत आहे', hi: 'काम कर रहा है' },
  idle: { en: 'Idle', mr: 'निष्क्रिय', hi: 'निष्क्रिय' },
  battery: { en: 'Battery', mr: 'बॅटरी', hi: 'बैटरी' },
  
  // Modes
  selectMode: { en: 'Select Mode', mr: 'मोड निवडा', hi: 'मोड चुनें' },
  automaticMode: { en: 'Automatic', mr: 'स्वयंचलित', hi: 'स्वचालित' },
  manualMode: { en: 'Manual', mr: 'मॅन्युअल', hi: 'मैन्युअल' },
  autoDescription: { en: 'AI detects diseases & auto-doses', mr: 'AI रोग शोधते आणि स्वयं-डोस', hi: 'AI रोग पहचानता है और स्वत: खुराक' },
  manualDescription: { en: 'You control the robot', mr: 'तुम्ही रोबोट नियंत्रित करता', hi: 'आप रोबोट नियंत्रित करें' },
  
  // Robot Controller
  speed: { en: 'Speed', mr: 'वेग', hi: 'गति' },
  direction: { en: 'Direction', mr: 'दिशा', hi: 'दिशा' },
  actions: { en: 'Actions', mr: 'क्रिया', hi: 'क्रियाएं' },
  sprayFertilizer: { en: 'Fertilizer', mr: 'खत', hi: 'उर्वरक' },
  sprayPesticide: { en: 'Pesticide', mr: 'कीटकनाशक', hi: 'कीटनाशक' },
  emergencyStop: { en: 'E-STOP', mr: 'थांबा', hi: 'रुको' },
  
  // Storage
  storageMonitor: { en: 'Storage Monitor', mr: 'साठवण मॉनिटर', hi: 'भंडारण मॉनिटर' },
  refillNeeded: { en: 'Refill Needed', mr: 'भरणे आवश्यक', hi: 'रिफिल आवश्यक' },
  levelOk: { en: 'Level OK', mr: 'पातळी ठीक', hi: 'स्तर ठीक' },
  
  // Crops
  cropHealth: { en: 'Crop Health', mr: 'पीक आरोग्य', hi: 'फसल स्वास्थ्य' },
  healthy: { en: 'Healthy', mr: 'निरोगी', hi: 'स्वस्थ' },
  diseased: { en: 'Diseased', mr: 'रोगग्रस्त', hi: 'रोगग्रस्त' },
  severity: { en: 'Severity', mr: 'तीव्रता', hi: 'गंभीरता' },
  recommendation: { en: 'Recommendation', mr: 'शिफारस', hi: 'सिफारिश' },
  
  // Alerts
  alertsTitle: { en: 'Alerts', mr: 'सूचना', hi: 'अलर्ट' },
  critical: { en: 'Critical', mr: 'गंभीर', hi: 'गंभीर' },
  warning: { en: 'Warning', mr: 'चेतावणी', hi: 'चेतावनी' },
  info: { en: 'Info', mr: 'माहिती', hi: 'जानकारी' },
  noAlerts: { en: 'No new alerts', mr: 'कोणत्याही नवीन सूचना नाहीत', hi: 'कोई नई सूचना नहीं' },
  
  // History & Reports
  historyReports: { en: 'History & Reports', mr: 'इतिहास आणि अहवाल', hi: 'इतिहास और रिपोर्ट' },
  last7Days: { en: 'Last 7 days', mr: 'गेले 7 दिवस', hi: 'पिछले 7 दिन' },
  last5Days: { en: 'Last 5 days', mr: 'गेले 5 दिवस', hi: 'पिछले 5 दिन' },
  costSavings: { en: 'Cost Savings', mr: 'खर्च बचत', hi: 'लागत बचत' },
  fertilizerUsed: { en: 'Fertilizer Used', mr: 'वापरलेले खत', hi: 'उर्वरक उपयोग' },
  pesticideUsed: { en: 'Pesticide Used', mr: 'वापरलेले कीटकनाशक', hi: 'कीटनाशक उपयोग' },
  dailyUsage: { en: 'Daily Usage', mr: 'दैनिक वापर', hi: 'दैनिक उपयोग' },
  date: { en: 'Date', mr: 'तारीख', hi: 'तारीख' },
  recentAlerts: { en: 'Recent Alerts', mr: 'अलीकडील सूचना', hi: 'हाल की सूचनाएं' },
  
  // Login Screen
  smartFarming: { en: 'Smart Farming with AI', mr: 'AI सह स्मार्ट शेती', hi: 'AI के साथ स्मार्ट खेती' },
  userIdLabel: { en: 'User ID', mr: 'वापरकर्ता आयडी', hi: 'यूज़र आईडी' },
  passwordLabel: { en: 'Password', mr: 'पासवर्ड', hi: 'पासवर्ड' },
  userIdPlaceholder: { en: 'Enter your User ID', mr: 'तुमचा आयडी टाका', hi: 'अपना आईडी दर्ज करें' },
  passwordPlaceholder: { en: 'Enter your Password', mr: 'पासवर्ड टाका', hi: 'पासवर्ड दर्ज करें' },
  loginButton: { en: 'Login', mr: 'लॉगिन', hi: 'लॉगिन' },
  loggingIn: { en: 'Logging in...', mr: 'लॉगिन होत आहे...', hi: 'लॉगिन हो रहा है...' },
  forgotPassword: { en: 'Forgot Password?', mr: 'पासवर्ड विसरलात?', hi: 'पासवर्ड भूल गए?' },
  userIdRequired: { en: 'User ID is required', mr: 'आयडी आवश्यक आहे', hi: 'आईडी आवश्यक है' },
  passwordRequired: { en: 'Password is required', mr: 'पासवर्ड आवश्यक आहे', hi: 'पासवर्ड आवश्यक है' },
  invalidCredentials: { en: 'Invalid User ID or Password', mr: 'चुकीचा आयडी किंवा पासवर्ड', hi: 'गलत आईडी या पासवर्ड' },
  loginSuccess: { en: 'Welcome back!', mr: 'पुन्हा स्वागत!', hi: 'वापसी पर स्वागत!' },
  loginFailed: { en: 'Login Failed', mr: 'लॉगिन अयशस्वी', hi: 'लॉगिन विफल' },
  welcomeMessage: { en: 'Welcome to KrishiBot', mr: 'KrishiBot मध्ये स्वागत आहे', hi: 'KrishiBot में आपका स्वागत है' },
  error: { en: 'Error', mr: 'त्रुटी', hi: 'त्रुटि' },
  tryAgain: { en: 'Please try again', mr: 'पुन्हा प्रयत्न करा', hi: 'पुनः प्रयास करें' },
  contactSupport: { en: 'Contact your administrator', mr: 'प्रशासकाशी संपर्क साधा', hi: 'व्यवस्थापक से संपर्क करें' },
  demoHint: { en: 'Demo Credentials:', mr: 'डेमो क्रेडेन्शियल:', hi: 'डेमो क्रेडेंशियल:' },
  userId: { en: 'User ID', mr: 'आयडी', hi: 'आईडी' },
  password: { en: 'Password', mr: 'पासवर्ड', hi: 'पासवर्ड' },
  madeForFarmers: { en: 'Made for Farmers', mr: 'शेतकऱ्यांसाठी बनवले', hi: 'किसानों के लिए बनाया गया' },
  logout: { en: 'Logout', mr: 'लॉगआउट', hi: 'लॉगआउट' },
  
  // General
  lastUpdated: { en: 'Last updated', mr: 'शेवटचे अपडेट', hi: 'अंतिम अपडेट' },
  smartFarmer: { en: 'Krishi Bot', mr: 'कृषी बॉट', hi: 'कृषि बॉट' },
  nextAction: { en: 'Next Action', mr: 'पुढील क्रिया', hi: 'अगली क्रिया' },
  scanning: { en: 'Scanning crops...', mr: 'पिके स्कॅन करत आहे...', hi: 'फसलों की स्कैनिंग...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
