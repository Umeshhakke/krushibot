import { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Square, 
  Droplets,
  RotateCcw,
  RotateCw,
  Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface RobotControllerProps {
  onCommand: (command: string) => void;
}

const RobotController = ({ onCommand }: RobotControllerProps) => {
  const { language, t } = useLanguage();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [speed, setSpeed] = useState(50);

  const handlePress = (command: string) => {
    setActiveButton(command);
    onCommand(command);
  };

  const handleRelease = () => {
    setActiveButton(null);
    onCommand('stop');
  };

  const getText = (en: string, mr: string, hi: string) => {
    if (language === 'mr') return mr;
    if (language === 'hi') return hi;
    return en;
  };

  const DirectionalButton = ({ 
    direction, 
    icon: Icon,
    className 
  }: { 
    direction: string; 
    icon: typeof ChevronUp;
    className?: string;
  }) => (
    <button
      onMouseDown={() => handlePress(direction)}
      onMouseUp={handleRelease}
      onMouseLeave={() => activeButton === direction && handleRelease()}
      onTouchStart={() => handlePress(direction)}
      onTouchEnd={handleRelease}
      className={cn(
        'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-150 active:scale-95',
        'bg-primary/10 hover:bg-primary/20 border-2 border-primary/30',
        activeButton === direction && 'bg-primary text-primary-foreground border-primary scale-95 shadow-lg shadow-primary/30',
        className
      )}
    >
      <Icon className={cn(
        'w-8 h-8 transition-colors',
        activeButton === direction ? 'text-primary-foreground' : 'text-primary'
      )} />
    </button>
  );

  const ActionButton = ({ 
    action, 
    icon: Icon, 
    label,
    variant = 'default'
  }: { 
    action: string; 
    icon: typeof Square;
    label: string;
    variant?: 'default' | 'danger' | 'accent';
  }) => {
    const variants = {
      default: {
        base: 'bg-muted hover:bg-muted/80 border-border text-foreground',
        active: 'bg-foreground text-background',
      },
      danger: {
        base: 'bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive',
        active: 'bg-destructive text-destructive-foreground',
      },
      accent: {
        base: 'bg-info/10 hover:bg-info/20 border-info/30 text-info',
        active: 'bg-info text-info-foreground',
      },
    };

    const v = variants[variant];

    return (
      <button
        onMouseDown={() => handlePress(action)}
        onMouseUp={handleRelease}
        onMouseLeave={() => activeButton === action && handleRelease()}
        onTouchStart={() => handlePress(action)}
        onTouchEnd={handleRelease}
        className={cn(
          'flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border-2 transition-all duration-150 active:scale-95',
          v.base,
          activeButton === action && v.active
        )}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Speed Control */}
      <div className="sensor-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">
              {t('speed')}
            </span>
          </div>
          <span className="text-lg font-bold text-primary">{speed}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{getText('Slow', 'हळू', 'धीमा')}</span>
          <span>{getText('Fast', 'वेगवान', 'तेज़')}</span>
        </div>
      </div>

      {/* Directional Pad */}
      <div className="sensor-card">
        <h4 className="font-semibold text-foreground mb-4 text-center">
          {t('direction')}
        </h4>
        
        <div className="flex flex-col items-center gap-2">
          {/* Forward */}
          <DirectionalButton direction="forward" icon={ChevronUp} />
          
          {/* Middle Row */}
          <div className="flex items-center gap-2">
            <DirectionalButton direction="left" icon={ChevronLeft} />
            
            {/* Stop Button - Center */}
            <button
              onClick={() => onCommand('stop')}
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-150',
                'bg-destructive/10 hover:bg-destructive/20 border-2 border-destructive/30',
                'active:bg-destructive active:text-destructive-foreground active:scale-95'
              )}
            >
              <Square className="w-6 h-6 text-destructive" fill="currentColor" />
            </button>
            
            <DirectionalButton direction="right" icon={ChevronRight} />
          </div>
          
          {/* Backward */}
          <DirectionalButton direction="backward" icon={ChevronDown} />
        </div>

        {/* Rotation Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onMouseDown={() => handlePress('rotate-left')}
            onMouseUp={handleRelease}
            onTouchStart={() => handlePress('rotate-left')}
            onTouchEnd={handleRelease}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all',
              'bg-secondary/10 hover:bg-secondary/20 border-secondary/30',
              activeButton === 'rotate-left' && 'bg-secondary text-secondary-foreground'
            )}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-sm font-medium">{getText('Left', 'डावे', 'बाएं')}</span>
          </button>
          <button
            onMouseDown={() => handlePress('rotate-right')}
            onMouseUp={handleRelease}
            onTouchStart={() => handlePress('rotate-right')}
            onTouchEnd={handleRelease}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all',
              'bg-secondary/10 hover:bg-secondary/20 border-secondary/30',
              activeButton === 'rotate-right' && 'bg-secondary text-secondary-foreground'
            )}
          >
            <span className="text-sm font-medium">{getText('Right', 'उजवे', 'दाएं')}</span>
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sensor-card">
        <h4 className="font-semibold text-foreground mb-4 text-center">
          {t('actions')}
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          <ActionButton 
            action="spray-fertilizer" 
            icon={Droplets} 
            label={t('sprayFertilizer')}
            variant="accent"
          />
          <ActionButton 
            action="spray-pesticide" 
            icon={Droplets} 
            label={t('sprayPesticide')}
            variant="default"
          />
          <ActionButton 
            action="emergency-stop" 
            icon={Square} 
            label={t('emergencyStop')}
            variant="danger"
          />
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className={cn(
          'w-2 h-2 rounded-full',
          activeButton ? 'bg-success animate-pulse' : 'bg-muted-foreground'
        )} />
        {activeButton 
          ? `${getText('Command', 'आदेश', 'कमांड')}: ${activeButton.toUpperCase()}`
          : getText('Robot Ready', 'रोबोट तयार', 'रोबोट तैयार')
        }
      </div>
    </div>
  );
};

export default RobotController;
