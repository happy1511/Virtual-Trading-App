import { useState } from 'react';

export function useActivePill(initialValue = 'Home') {
  const [activePill, setActivePill] = useState(initialValue);

  return [activePill, setActivePill];
}