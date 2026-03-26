import { Cpu, Hand, Zap, Shield, Scan } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import RobotController from '@/components/robot/RobotController';

interface ModesScreenProps {
  currentMode: 'auto' | 'manual';
  onModeChange: (mode: 'auto' | 'manual') => void;
}

const ModesScreen = ({ currentMode, onModeChange }: ModesScreenProps) => {
  const { t, language } = useLanguage();

  const getText = (en: string, mr: string, hi: string) => {
    if (language === 'mr') return mr;
    if (language === 'hi') return hi;
    return en;
  };

  const handleRobotCommand = (command: string) => {
    console.log('Robot command:', command);
    
    // Show toast for important commands
    if (command === 'emergency-stop') {
      toast({
        title: getText('🛑 Emergency Stop', '🛑 आणीबाणी थांबवा', '🛑 आपातकालीन रोक'),
        description: getText('Robot stopped immediately', 'रोबोट थांबवले', 'रोबोट तुरंत रुक गया'),
        variant: 'destructive',
      });
    } else if (command.includes('spray')) {
      toast({
        title: getText('💧 Spraying', '💧 फवारणी', '💧 छिड़काव'),
        description: command === 'spray-fertilizer' 
          ? getText('Fertilizer spray activated', 'खत फवारणी सुरू', 'उर्वरक छिड़काव शुरू')
          : getText('Pesticide spray activated', 'कीटकनाशक फवारणी सुरू', 'कीटनाशक छिड़काव शुरू'),
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">{t('selectMode')}</h2>

      {/* Mode Selection Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <button
          onClick={() => onModeChange('auto')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all',
            currentMode === 'auto' 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Cpu className="w-5 h-5" />
          {t('automaticMode')}
        </button>
        <button
          onClick={() => onModeChange('manual')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all',
            currentMode === 'manual' 
              ? 'bg-secondary text-secondary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Hand className="w-5 h-5" />
          {t('manualMode')}
        </button>
      </div>

      {/* Mode Content */}
      {currentMode === 'auto' ? (
        <div className="sensor-card animate-scale-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-lg">
              <Cpu className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{t('automaticMode')}</h3>
              <p className="text-sm text-muted-foreground">{t('autoDescription')}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10">
              <Zap className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground">
                {getText('AI Disease Detection Active', 'AI रोग शोध सक्रिय', 'AI रोग पहचान सक्रिय')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-info/10">
              <Shield className="w-5 h-5 text-info" />
              <span className="text-sm text-foreground">
                {getText('Auto-dosing Enabled', 'स्वयं-डोसिंग सक्षम', 'स्वचालित खुराक सक्षम')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
              <Scan className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">
                {getText('Continuous Crop Monitoring', 'सतत पीक निरीक्षण', 'निरंतर फसल निगरानी')}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
            <p className="text-center text-sm text-foreground font-medium">
              {t('scanning')}
            </p>
            <div className="flex justify-center mt-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-scale-in">
          <RobotController onCommand={handleRobotCommand} />
        </div>
      )}
    </div>
  );
};

export default ModesScreen;
