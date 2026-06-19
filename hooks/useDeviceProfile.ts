'use client';
import { useState, useEffect } from 'react';

export type DeviceProfile = 'desktop' | 'mobileHigh' | 'mobileLow' | null;

export function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>(null);

  useEffect(() => {
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const touch = navigator.maxTouchPoints > 0;
    const ua = navigator.userAgent;
    const isLowEnd = /Moto G|SM-A14|SM-A13|Redmi 9|Nokia 2/i.test(ua);

    if (isLowEnd || (touch && cores <= 4 && memory <= 3)) {
      setProfile('mobileLow');
    } else if (touch && cores >= 6 && memory >= 4) {
      setProfile('mobileHigh');
    } else if (!touch && cores >= 4 && memory >= 6) {
      setProfile('desktop');
    } else {
      setProfile('mobileLow');
    }
  }, []);

  return profile;
}