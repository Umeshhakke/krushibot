import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

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
    const dataRef = ref(database, path);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          setData({
            temperature: val.temperature ?? DEFAULT_DATA.temperature,
            humidity: val.humidity ?? DEFAULT_DATA.humidity,
            soilMoisture: val.soilMoisture ?? DEFAULT_DATA.soilMoisture,
            fertilizerLevel: val.fertilizerLevel ?? DEFAULT_DATA.fertilizerLevel,
            pesticideLevel: val.pesticideLevel ?? DEFAULT_DATA.pesticideLevel,
            robotOnline: val.robotOnline ?? DEFAULT_DATA.robotOnline,
            robotStatus: val.robotStatus ?? DEFAULT_DATA.robotStatus,
            batteryLevel: val.batteryLevel ?? DEFAULT_DATA.batteryLevel,
          });
          setIsConnected(true);
          setError(null);
        } else {
          setData(DEFAULT_DATA);
          setIsConnected(true);
          setError('No data at path: ' + path);
        }
      },
      (err) => {
        console.error('Firebase read error:', err);
        setError(err.message);
        setIsConnected(false);
      }
    );

    // Monitor connection state
    const connRef = ref(database, '.info/connected');
    const connUnsub = onValue(connRef, (snap) => {
      setIsConnected(snap.val() === true);
    });

    return () => {
      unsubscribe();
      connUnsub();
    };
  }, [path]);

  return { data, isConnected, error };
};
