import { Thermometer, Droplets, CloudRain, FlaskConical, Bug, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SensorCard from '@/components/dashboard/SensorCard';
import CircularGauge from '@/components/dashboard/CircularGauge';
import RobotStatusCard from '@/components/dashboard/RobotStatusCard';

interface FarmData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  fertilizerLevel: number;
  pesticideLevel: number;
  robotOnline: boolean;
  robotStatus: 'working' | 'idle' | 'offline';
  batteryLevel: number;
}

interface DashboardScreenProps {
  data: FarmData;
}

const DashboardScreen = ({ data }: DashboardScreenProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t('liveData')}</h2>
        <span className="text-xs text-muted-foreground">
          {t('lastUpdated')}: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <RobotStatusCard 
        isOnline={data.robotOnline}
        status={data.robotStatus}
        batteryLevel={data.batteryLevel}
      />

      {/* Circular Gauges for Main Sensors */}
      <div className="grid grid-cols-3 gap-2">
        <CircularGauge
          icon={Thermometer}
          label={t('temperature')}
          value={data.temperature}
          unit="°C"
          color="secondary"
          maxValue={50}
          size="sm"
        />
        <CircularGauge
          icon={Droplets}
          label={t('humidity')}
          value={data.humidity}
          unit="%"
          color="info"
          size="sm"
        />
        <CircularGauge
          icon={CloudRain}
          label={t('soilMoisture')}
          value={data.soilMoisture}
          unit="%"
          color="primary"
          size="sm"
        />
      </div>

      {/* Storage Level Cards */}
      <div className="grid grid-cols-2 gap-3">
        <SensorCard
          icon={FlaskConical}
          label={t('fertilizerLevel')}
          value={data.fertilizerLevel}
          unit="%"
          color="accent"
        />
        <SensorCard
          icon={Bug}
          label={t('pesticideLevel')}
          value={data.pesticideLevel}
          unit="%"
          color={data.pesticideLevel < 20 ? 'warning' : 'info'}
        />
      </div>

      {/* Quick Status */}
      <div className="sensor-card bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {t('nextAction')}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' && 'Auto-spray scheduled in 2 hours'}
              {language === 'mr' && 'स्वयं-फवारणी 2 तासांत नियोजित'}
              {language === 'hi' && 'स्वचालित छिड़काव 2 घंटे में निर्धारित'}
            </p>
          </div>
          <div className="text-2xl animate-pulse">🤖</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
