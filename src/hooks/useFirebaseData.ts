import { useState, useEffect } from 'react';

export interface FarmData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  fertilizerLevel: number;
  pesticideLevel: number;
  robotOnline: boolean;
  robotStatus: 'working' | 'idle' | 'offline';
  batteryLevel: number;
}

const DEFAULT_DATA: FarmData = {
  temperature: 0,
  humidity: 0,
  soilMoisture: 0,
  fertilizerLevel: 0,
  pesticideLevel: 0,
  robotOnline: false,
  robotStatus: 'offline',
  batteryLevel: 0,
};

export const useFirebaseData = (path: string = 'sensorData') => {
  const [data, setData] = useState<FarmData>(DEFAULT_DATA);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/sensor-data");
      const val = await res.json();

      setData({
        temperature: val.temperature ?? 0,
        humidity: val.humidity ?? 0,
        soilMoisture: val.soilMoisture ?? 0,
        fertilizerLevel: val.fertilizerLevel ?? 0,
        pesticideLevel: val.pesticideLevel ?? 0,
        robotOnline: val.robotOnline ?? false,
        robotStatus: val.robotStatus ?? "offline",
        batteryLevel: val.batteryLevel ?? 0,
      });

      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      console.error("API error:", err);
      setError(err.message);
      setIsConnected(false);
    }
  };

  fetchData();

  // auto-refresh every 3 sec
  const interval = setInterval(fetchData, 3000);

  return () => clearInterval(interval);
}, [path]);

  return { data, isConnected, error };
};
