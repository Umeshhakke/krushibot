import { AlertTriangle, Info, AlertCircle, Clock, BellRing } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  titleMarathi: string;
  titleHindi: string;
  message: string;
  messageMarathi: string;
  messageHindi: string;
  time: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Low Pesticide Level',
    titleMarathi: 'कमी कीटकनाशक पातळी',
    titleHindi: 'कम कीटनाशक स्तर',
    message: 'Pesticide tank is below 15%. Refill required immediately.',
    messageMarathi: 'कीटकनाशक टाकी 15% च्या खाली आहे. त्वरित भरणे आवश्यक.',
    messageHindi: 'कीटनाशक टैंक 15% से नीचे है। तुरंत भरने की आवश्यकता।',
    time: '2 min ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Disease Detected in Row 3',
    titleMarathi: 'ओळ 3 मध्ये रोग आढळला',
    titleHindi: 'पंक्ति 3 में रोग का पता चला',
    message: 'Powdery mildew detected in Cotton Field B. Apply 30ml fungicide.',
    messageMarathi: 'कापूस शेत B मध्ये भुरी रोग आढळला. 30ml बुरशीनाशक लावा.',
    messageHindi: 'कपास खेत B में पाउडरी मिल्ड्यू मिला। 30ml फफूंदनाशक लगाएं।',
    time: '15 min ago',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Battery Low - Return to Base',
    titleMarathi: 'बॅटरी कमी - बेसवर परत जा',
    titleHindi: 'बैटरी कम - बेस पर वापस जाएं',
    message: 'Robot battery at 20%. Returning to charging station.',
    messageMarathi: 'रोबोट बॅटरी 20% वर. चार्जिंग स्टेशनवर परत.',
    messageHindi: 'रोबोट बैटरी 20% पर। चार्जिंग स्टेशन पर वापस जा रहा है।',
    time: '30 min ago',
  },
  {
    id: 4,
    type: 'info',
    title: 'Spraying Complete',
    titleMarathi: 'फवारणी पूर्ण',
    titleHindi: 'छिड़काव पूर्ण',
    message: 'Auto-spraying completed in Tomato Plot A.',
    messageMarathi: 'टोमॅटो प्लॉट A मध्ये स्वयं-फवारणी पूर्ण.',
    messageHindi: 'टमाटर प्लॉट A में स्वचालित छिड़काव पूर्ण।',
    time: '1 hour ago',
  },
  {
    id: 5,
    type: 'info',
    title: 'Robot Recharged',
    titleMarathi: 'रोबोट रिचार्ज',
    titleHindi: 'रोबोट रिचार्ज',
    message: 'Robot battery fully charged and ready for operation.',
    messageMarathi: 'रोबोट बॅटरी पूर्ण चार्ज आणि ऑपरेशनसाठी तयार.',
    messageHindi: 'रोबोट बैटरी पूर्ण चार्ज और संचालन के लिए तैयार।',
    time: '2 hours ago',
  },
];

const AlertsScreen = () => {
  const { t, language } = useLanguage();

  const alertConfig = {
    critical: {
      icon: AlertCircle,
      label: t('critical'),
      bgClass: 'bg-destructive/10 border-l-4 border-destructive',
      iconBg: 'bg-destructive/20',
      iconColor: 'text-destructive',
    },
    warning: {
      icon: AlertTriangle,
      label: t('warning'),
      bgClass: 'bg-warning/10 border-l-4 border-warning',
      iconBg: 'bg-warning/20',
      iconColor: 'text-warning',
    },
    info: {
      icon: Info,
      label: t('info'),
      bgClass: 'bg-info/10 border-l-4 border-info',
      iconBg: 'bg-info/20',
      iconColor: 'text-info',
    },
  };

  const getTitle = (alert: Alert) => {
    if (language === 'mr') return alert.titleMarathi;
    if (language === 'hi') return alert.titleHindi;
    return alert.title;
  };

  const getMessage = (alert: Alert) => {
    if (language === 'mr') return alert.messageMarathi;
    if (language === 'hi') return alert.messageHindi;
    return alert.message;
  };

  const criticalCount = mockAlerts.filter(a => a.type === 'critical').length;
  const warningCount = mockAlerts.filter(a => a.type === 'warning').length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">{t('alertsTitle')}</h2>
        </div>
        <div className="flex gap-2">
          {criticalCount > 0 && (
            <span className="status-badge bg-destructive/15 text-destructive">
              {criticalCount} {t('critical')}
            </span>
          )}
          {warningCount > 0 && (
            <span className="status-badge bg-warning/15 text-warning">
              {warningCount} {t('warning')}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {mockAlerts.map((alert, index) => {
          const config = alertConfig[alert.type];
          const AlertIcon = config.icon;

          return (
            <div 
              key={alert.id}
              className={cn('sensor-card animate-slide-up', config.bgClass)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn('p-2.5 rounded-xl', config.iconBg)}>
                  <AlertIcon className={cn('w-5 h-5', config.iconColor)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">
                      {getTitle(alert)}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getMessage(alert)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsScreen;
