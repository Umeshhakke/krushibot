import { FlaskConical, Bug, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface StorageScreenProps {
  fertilizerLevel: number;
  pesticideLevel: number;
}

const StorageScreen = ({ fertilizerLevel, pesticideLevel }: StorageScreenProps) => {
  const { t } = useLanguage();

  const getStatusInfo = (level: number) => {
    if (level < 20) return { status: 'critical', color: 'destructive', label: t('refillNeeded') };
    if (level < 40) return { status: 'warning', color: 'warning', label: t('refillNeeded') };
    return { status: 'ok', color: 'success', label: t('levelOk') };
  };

  const fertilizerStatus = getStatusInfo(fertilizerLevel);
  const pesticideStatus = getStatusInfo(pesticideLevel);

  const TankGauge = ({ 
    level, 
    icon: Icon, 
    label, 
    color,
    statusLabel 
  }: { 
    level: number; 
    icon: typeof FlaskConical;
    label: string;
    color: string;
    statusLabel: string;
  }) => (
    <div className="sensor-card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-3 rounded-xl',
            color === 'destructive' ? 'bg-destructive/10' : 
            color === 'warning' ? 'bg-warning/10' : 'bg-accent/10'
          )}>
            <Icon className={cn(
              'w-6 h-6',
              color === 'destructive' ? 'text-destructive' : 
              color === 'warning' ? 'text-warning' : 'text-accent'
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{label}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {color === 'success' ? (
                <CheckCircle className="w-3.5 h-3.5 text-success" />
              ) : (
                <AlertTriangle className={cn(
                  'w-3.5 h-3.5',
                  color === 'destructive' ? 'text-destructive' : 'text-warning'
                )} />
              )}
              <span className={cn(
                'text-xs font-medium',
                color === 'destructive' ? 'text-destructive' : 
                color === 'warning' ? 'text-warning' : 'text-success'
              )}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
        <span className="text-3xl font-bold text-foreground">{level}%</span>
      </div>

      {/* Tank visualization */}
      <div className="relative h-32 bg-muted rounded-2xl overflow-hidden border-2 border-border">
        <div 
          className={cn(
            'absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-b-xl',
            color === 'destructive' ? 'bg-destructive/60' : 
            color === 'warning' ? 'bg-warning/60' : 'bg-accent/60'
          )}
          style={{ height: `${level}%` }}
        >
          <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-transparent to-white/30" />
        </div>
        
        {/* Level markers */}
        <div className="absolute inset-y-0 right-3 flex flex-col justify-between py-2 text-xs text-muted-foreground">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">{t('storageMonitor')}</h2>

      <TankGauge 
        level={fertilizerLevel}
        icon={FlaskConical}
        label={t('fertilizerLevel')}
        color={fertilizerStatus.color}
        statusLabel={fertilizerStatus.label}
      />

      <TankGauge 
        level={pesticideLevel}
        icon={Bug}
        label={t('pesticideLevel')}
        color={pesticideStatus.color}
        statusLabel={pesticideStatus.label}
      />
    </div>
  );
};

export default StorageScreen;
