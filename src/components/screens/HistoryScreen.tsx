import { Calendar, TrendingDown, TrendingUp, Droplets, Bug, Clock, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DailyUsage {
  date: string;
  fertilizer: number;
  pesticide: number;
  waterUsed: number;
  hoursActive: number;
}

interface CostSaving {
  category: string;
  categoryMarathi: string;
  saved: number;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

const mockUsageData: DailyUsage[] = [
  { date: '2025-01-22', fertilizer: 2.5, pesticide: 1.2, waterUsed: 150, hoursActive: 6 },
  { date: '2025-01-21', fertilizer: 3.0, pesticide: 0.8, waterUsed: 180, hoursActive: 7 },
  { date: '2025-01-20', fertilizer: 2.8, pesticide: 1.5, waterUsed: 165, hoursActive: 5 },
  { date: '2025-01-19', fertilizer: 2.2, pesticide: 1.0, waterUsed: 140, hoursActive: 6 },
  { date: '2025-01-18', fertilizer: 3.2, pesticide: 2.0, waterUsed: 200, hoursActive: 8 },
];

const mockSavings: CostSaving[] = [
  { category: 'Fertilizer', categoryMarathi: 'खत', saved: 1250, icon: Droplets, trend: 'down' },
  { category: 'Pesticide', categoryMarathi: 'कीटकनाशक', saved: 890, icon: Bug, trend: 'down' },
  { category: 'Labor', categoryMarathi: 'मजूर', saved: 3500, icon: Clock, trend: 'down' },
];

const HistoryScreen = () => {
  const { t, language } = useLanguage();

  const totalFertilizer = mockUsageData.reduce((sum, d) => sum + d.fertilizer, 0);
  const totalPesticide = mockUsageData.reduce((sum, d) => sum + d.pesticide, 0);
  const totalSaved = mockSavings.reduce((sum, s) => sum + s.saved, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t('historyReports')}</h2>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{t('last7Days')}</span>
        </div>
      </div>

      {/* Cost Savings Summary */}
      <div className="sensor-card bg-gradient-to-br from-success/10 to-primary/5 border-success/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">{t('costSavings')}</h3>
          <div className="flex items-center gap-1 text-success font-bold text-lg">
            <IndianRupee className="w-5 h-5" />
            {totalSaved.toLocaleString()}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {mockSavings.map((saving, index) => {
            const SavingIcon = saving.icon;
            return (
              <div 
                key={saving.category}
                className="text-center p-2 rounded-xl bg-background/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SavingIcon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'mr' ? saving.categoryMarathi : saving.category}
                </p>
                <div className="flex items-center justify-center gap-1 text-success">
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-sm font-semibold">₹{saving.saved}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="sensor-card">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">{t('fertilizerUsed')}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalFertilizer.toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground mt-1">{t('last5Days')}</p>
        </div>
        
        <div className="sensor-card">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-muted-foreground">{t('pesticideUsed')}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalPesticide.toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground mt-1">{t('last5Days')}</p>
        </div>
      </div>

      {/* Daily Usage Table */}
      <div className="sensor-card">
        <h3 className="font-semibold text-foreground mb-3">{t('dailyUsage')}</h3>
        
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
            <span>{t('date')}</span>
            <span className="text-center">🧪 (L)</span>
            <span className="text-center">☠️ (L)</span>
            <span className="text-center">⏱️ (h)</span>
          </div>
          
          {/* Table Rows */}
          {mockUsageData.map((day, index) => (
            <div 
              key={day.date}
              className={cn(
                'grid grid-cols-4 gap-2 py-2 text-sm',
                index !== mockUsageData.length - 1 && 'border-b border-border/50'
              )}
            >
              <span className="text-foreground font-medium">{formatDate(day.date)}</span>
              <span className="text-center text-accent">{day.fertilizer}</span>
              <span className="text-center text-warning">{day.pesticide}</span>
              <span className="text-center text-info">{day.hoursActive}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts History */}
      <div className="sensor-card">
        <h3 className="font-semibold text-foreground mb-3">{t('recentAlerts')}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-destructive/10">
            <span className="text-lg">🔴</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {language === 'mr' ? 'कमी कीटकनाशक पातळी' : 'Low Pesticide Level'}
              </p>
              <p className="text-xs text-muted-foreground">2 min ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg bg-warning/10">
            <span className="text-lg">🟡</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {language === 'mr' ? 'रोग आढळला - पान करपा' : 'Disease Detected - Leaf Blight'}
              </p>
              <p className="text-xs text-muted-foreground">15 min ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg bg-info/10">
            <span className="text-lg">🔵</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {language === 'mr' ? 'फवारणी पूर्ण' : 'Spraying Complete'}
              </p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
