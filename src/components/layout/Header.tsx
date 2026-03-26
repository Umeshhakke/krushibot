import { Bell, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import krishiBotLogo from '@/assets/krishi-bot-logo.png';

interface HeaderProps {
  alertCount?: number;
  onAlertClick?: () => void;
}

const Header = ({ alertCount = 2, onAlertClick }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuth();

  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'mr' as const, label: 'मरा' },
    { code: 'hi' as const, label: 'हिं' },
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <img 
            src={krishiBotLogo} 
            alt="Krishi Bot Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-md"
          />
          <h1 className="text-lg font-bold text-foreground">{t('smartFarmer')}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Alert Bell */}
          <button 
            onClick={onAlertClick}
            className="relative p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            aria-label="View alerts"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-bold rounded-full animate-pulse">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            )}
          </button>

          {/* Language Toggle */}
          <div className="flex bg-muted rounded-xl p-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all',
                  language === lang.code
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-muted/50 hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label={t('logout')}
            title={t('logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
