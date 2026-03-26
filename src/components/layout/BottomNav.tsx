import { Home, Cpu, Package, Leaf, Bell, History } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'modes', icon: Cpu, label: t('modes') },
    { id: 'storage', icon: Package, label: t('storage') },
    { id: 'crops', icon: Leaf, label: t('crops') },
    { id: 'history', icon: History, label: t('history') },
    { id: 'alerts', icon: Bell, label: t('alerts') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="flex justify-around items-center px-2 py-2 max-w-lg mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px]',
              activeTab === id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className={cn('w-5 h-5', activeTab === id && 'scale-110')} />
            <span className="text-[10px] font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
