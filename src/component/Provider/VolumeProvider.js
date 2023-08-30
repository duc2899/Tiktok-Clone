import { createContext, useState } from 'react';

const VolumeContext = createContext();
function VolumeProvider({ children }) {
  const [volume, setVolume] = useState(0);

  const value = {
    volume,
    setVolume,
  };
  return <VolumeContext.Provider value={value}>{children}</VolumeContext.Provider>;
}

export { VolumeProvider, VolumeContext };
