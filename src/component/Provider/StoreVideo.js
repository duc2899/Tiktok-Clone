import { createContext, useState } from 'react';

const DataVideosArray = createContext();
function StoreVideos({ children }) {
  const [video, setVideo] = useState([]);
  const arrayID = [];
  // console.log(video);

  video.forEach((element) => {
    arrayID.push(element.id);
  });

  const value = {
    arrayID,
    video,
    setVideo,
  };
  return <DataVideosArray.Provider value={value}>{children}</DataVideosArray.Provider>;
}

export { StoreVideos, DataVideosArray };
