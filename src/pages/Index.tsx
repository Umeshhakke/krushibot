import { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import DashboardScreen from '@/components/screens/DashboardScreen';
import ModesScreen from '@/components/screens/ModesScreen';
import StorageScreen from '@/components/screens/StorageScreen';
import CropsScreen from '@/components/screens/CropsScreen';
import AlertsScreen from '@/components/screens/AlertsScreen';
import HistoryScreen from '@/components/screens/HistoryScreen';
import SplashScreen from '@/components/screens/SplashScreen';
import LoginScreen from '@/components/screens/LoginScreen';
import { useFirebaseData } from '@/hooks/useFirebaseData';

type AppState = 'splash' | 'login' | 'dashboard';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [alertCount, setAlertCount] = useState(2);
  
  // Live data from Firebase Realtime Database
  const { data: farmData, isConnected } = useFirebaseData('sensorData');

  // Handle splash screen completion
  const handleSplashComplete = useCallback(() => {
    if (isAuthenticated) {
      setAppState('dashboard');
    } else {
      setAppState('login');
    }
  }, [isAuthenticated]);

  // Update app state when auth changes
  useEffect(() => {
    if (!isLoading && appState === 'login' && isAuthenticated) {
      setAppState('dashboard');
    }
  }, [isAuthenticated, isLoading, appState]);

  const handleAlertClick = () => {
    setActiveTab('alerts');
    setAlertCount(0);
  };

  const handleLoginSuccess = () => {
    setAppState('dashboard');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen data={farmData} />;
      case 'modes':
        return <ModesScreen currentMode={mode} onModeChange={setMode} />;
      case 'storage':
        return (
          <StorageScreen 
            fertilizerLevel={farmData.fertilizerLevel} 
            pesticideLevel={farmData.pesticideLevel} 
          />
        );
      case 'crops':
        return <CropsScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'alerts':
        return <AlertsScreen />;
      default:
        return <DashboardScreen data={farmData} />;
    }
  };

  // Show splash screen
  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Show login screen
  if (appState === 'login') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main dashboard
  return (
    <div className="min-h-screen bg-background">
      <Header alertCount={alertCount} onAlertClick={handleAlertClick} />
      <main className="px-4 py-4 pb-24 max-w-lg mx-auto">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
