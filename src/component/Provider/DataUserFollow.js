import { createContext, useState } from 'react';

const DataUserFollowNew = createContext();
function DataUserFollow({ children }) {
  const [userFollow, setUserFollow] = useState({});

  const value = {
    userFollow,
    setUserFollow,
  };
  return <DataUserFollowNew.Provider value={value}>{children}</DataUserFollowNew.Provider>;
}

export { DataUserFollow, DataUserFollowNew };
