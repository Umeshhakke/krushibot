import { Bot, Wifi, WifiOff, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface RobotStatusCardProps {
  isOnline: boolean;
  status: 'working' | 'idle' | 'offline';
  batteryLevel: number;
}

const RobotStatusCard = ({ isOnline, status, batteryLevel }: RobotStatusCardProps) => {
  const { t } = useLanguage();

  const statusConfig = {
    working: { label: t('working'), color: 'text-success', bgColor: 'bg-success/15', pulse: true },
    idle: { label: t('idle'), color: 'text-warning', bgColor: 'bg-warning/15', pulse: false },
    offline: { label: t('offline'), color: 'text-destructive', bgColor: 'bg-destructive/15', pulse: false },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="sensor-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'relative p-3 rounded-xl',
            isOnline ? 'bg-primary/10' : 'bg-muted'
          )}>
            <Bot className={cn('w-7 h-7', isOnline ? 'text-primary' : 'text-muted-foreground')} />
            {currentStatus.pulse && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('robotStatus')}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isOnline ? (
                <Wifi className="w-3.5 h-3.5 text-success" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-destructive" />
              )}
              <span className="text-xs text-muted-foreground">
                {isOnline ? t('online') : t('offline')}
              </span>
            </div>
          </div>
        </div>
        
        <div className={cn('status-badge', currentStatus.bgColor, currentStatus.color)}>
          <Activity className="w-3.5 h-3.5" />
          {currentStatus.label}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">{t('battery')}</span>
            <span className="font-medium text-foreground">{batteryLevel}%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full rounded-full transition-all duration-500',
                batteryLevel > 50 ? 'bg-success' : batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
              )}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotStatusCard;
