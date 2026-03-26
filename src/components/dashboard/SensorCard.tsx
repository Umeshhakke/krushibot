import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: 'primary' | 'secondary' | 'accent' | 'warning' | 'info';
  maxValue?: number;
}

const colorClasses = {
  primary: 'text-primary bg-primary/10',
  secondary: 'text-secondary bg-secondary/10',
  accent: 'text-accent bg-accent/10',
  warning: 'text-warning bg-warning/10',
  info: 'text-info bg-info/10',
};

const progressColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  warning: 'bg-warning',
  info: 'bg-info',
};

const SensorCard = ({ icon: Icon, label, value, unit, color, maxValue = 100 }: SensorCardProps) => {
  const progress = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="sensor-card animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2.5 rounded-xl', colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-2xl font-bold text-foreground">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-0.5">{unit}</span>
        </span>
      </div>
      
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full transition-all duration-700 ease-out', progressColors[color])}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SensorCard;
