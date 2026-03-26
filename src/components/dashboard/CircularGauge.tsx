import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircularGaugeProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: 'primary' | 'secondary' | 'accent' | 'warning' | 'info' | 'success' | 'destructive';
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  primary: { stroke: 'stroke-primary', text: 'text-primary', bg: 'bg-primary/10' },
  secondary: { stroke: 'stroke-secondary', text: 'text-secondary', bg: 'bg-secondary/10' },
  accent: { stroke: 'stroke-accent', text: 'text-accent', bg: 'bg-accent/10' },
  warning: { stroke: 'stroke-warning', text: 'text-warning', bg: 'bg-warning/10' },
  info: { stroke: 'stroke-info', text: 'text-info', bg: 'bg-info/10' },
  success: { stroke: 'stroke-success', text: 'text-success', bg: 'bg-success/10' },
  destructive: { stroke: 'stroke-destructive', text: 'text-destructive', bg: 'bg-destructive/10' },
};

const sizes = {
  sm: { size: 80, strokeWidth: 6, fontSize: 'text-lg' },
  md: { size: 100, strokeWidth: 8, fontSize: 'text-xl' },
  lg: { size: 120, strokeWidth: 10, fontSize: 'text-2xl' },
};

const CircularGauge = ({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  color, 
  maxValue = 100,
  size = 'md' 
}: CircularGaugeProps) => {
  const progress = Math.min((value / maxValue) * 100, 100);
  const { size: svgSize, strokeWidth, fontSize } = sizes[size];
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="sensor-card flex flex-col items-center p-4 animate-fade-in">
      <div className="relative">
        <svg width={svgSize} height={svgSize} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn('transition-all duration-700 ease-out', colorClasses[color].stroke)}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold', fontSize, colorClasses[color].text)}>
            {value}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2">
        <div className={cn('p-1.5 rounded-lg', colorClasses[color].bg)}>
          <Icon className={cn('w-4 h-4', colorClasses[color].text)} />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

export default CircularGauge;
