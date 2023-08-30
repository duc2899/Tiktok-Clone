import { createContext, useState } from 'react';

const DataVideoNew = createContext();
function DataVideoLike({ children }) {
  const [video, setVideo] = useState({});

  const value = {
    video,
    setVideo,
  };
  return <DataVideoNew.Provider value={value}>{children}</DataVideoNew.Provider>;
}

export { DataVideoLike, DataVideoNew };
