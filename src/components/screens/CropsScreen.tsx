import { Leaf, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CropData {
  id: number;
  name: string;
  nameMarathi: string;
  nameHindi: string;
  health: 'healthy' | 'warning' | 'diseased';
  disease?: string;
  diseaseMarathi?: string;
  diseaseHindi?: string;
  severity?: 'low' | 'medium' | 'high';
  recommendation?: string;
  recommendationMarathi?: string;
  recommendationHindi?: string;
  image: string;
}

const mockCrops: CropData[] = [
  { 
    id: 1, 
    name: 'Tomato Plot A', 
    nameMarathi: 'टोमॅटो प्लॉट A',
    nameHindi: 'टमाटर प्लॉट A',
    health: 'healthy',
    image: '🍅'
  },
  { 
    id: 2, 
    name: 'Cotton Field B', 
    nameMarathi: 'कापूस शेत B',
    nameHindi: 'कपास खेत B',
    health: 'diseased', 
    disease: 'Powdery Mildew',
    diseaseMarathi: 'भुरी रोग',
    diseaseHindi: 'पाउडरी मिल्ड्यू',
    severity: 'high',
    recommendation: 'Apply 30ml fungicide per plant',
    recommendationMarathi: 'प्रति झाड 30ml बुरशीनाशक फवारा',
    recommendationHindi: 'प्रति पौधा 30ml फफूंदनाशक लगाएं',
    image: '🌿'
  },
  { 
    id: 3, 
    name: 'Wheat Section C', 
    nameMarathi: 'गहू विभाग C',
    nameHindi: 'गेहूं खंड C',
    health: 'warning', 
    disease: 'Aphid Infestation',
    diseaseMarathi: 'माव्याचा प्रादुर्भाव',
    diseaseHindi: 'एफिड संक्रमण',
    severity: 'low',
    recommendation: 'Light pesticide spray recommended',
    recommendationMarathi: 'हलके कीटकनाशक फवारणी शिफारसीय',
    recommendationHindi: 'हल्का कीटनाशक छिड़काव अनुशंसित',
    image: '🌾'
  },
  { 
    id: 4, 
    name: 'Sugarcane D', 
    nameMarathi: 'ऊस D',
    nameHindi: 'गन्ना D',
    health: 'healthy',
    image: '🎋'
  },
];

const CropsScreen = () => {
  const { t, language } = useLanguage();

  const healthConfig = {
    healthy: { 
      label: t('healthy'), 
      color: 'text-success', 
      bg: 'bg-success/10',
      border: 'border-success/30',
      icon: CheckCircle 
    },
    warning: { 
      label: t('warning'), 
      color: 'text-warning', 
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      icon: AlertTriangle 
    },
    diseased: { 
      label: t('diseased'), 
      color: 'text-destructive', 
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      icon: AlertTriangle 
    },
  };

  const severityColors = {
    low: 'bg-warning/20 text-warning',
    medium: 'bg-secondary/20 text-secondary',
    high: 'bg-destructive/20 text-destructive',
  };

  const getName = (crop: CropData) => {
    if (language === 'mr') return crop.nameMarathi;
    if (language === 'hi') return crop.nameHindi;
    return crop.name;
  };

  const getDisease = (crop: CropData) => {
    if (language === 'mr') return crop.diseaseMarathi;
    if (language === 'hi') return crop.diseaseHindi;
    return crop.disease;
  };

  const getRecommendation = (crop: CropData) => {
    if (language === 'mr') return crop.recommendationMarathi;
    if (language === 'hi') return crop.recommendationHindi;
    return crop.recommendation;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t('cropHealth')}</h2>
        <div className="flex items-center gap-1 text-success">
          <Leaf className="w-4 h-4" />
          <span className="text-sm font-medium">4 plots</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockCrops.map((crop, index) => {
          const config = healthConfig[crop.health];
          const StatusIcon = config.icon;

          return (
            <div 
              key={crop.id}
              className={cn(
                'sensor-card border-l-4',
                config.border
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{crop.image}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {getName(crop)}
                    </h3>
                    <div className={cn('status-badge whitespace-nowrap', config.bg, config.color)}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </div>
                  </div>

                  {crop.disease && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        {getDisease(crop)}
                      </p>
                      {crop.severity && (
                        <span className={cn(
                          'inline-block px-2 py-0.5 rounded text-xs font-medium',
                          severityColors[crop.severity]
                        )}>
                          {t('severity')}: {crop.severity.toUpperCase()}
                        </span>
                      )}
                      
                      {/* Recommendation Card */}
                      {crop.recommendation && (
                        <div className="mt-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-primary mb-0.5">
                                {t('recommendation')}
                              </p>
                              <p className="text-sm text-foreground">
                                {getRecommendation(crop)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropsScreen;
