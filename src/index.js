import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './component/GlobalStyles/GlobalStyles';
import { VolumeProvider } from '~/component/Provider/VolumeProvider';
import { StatusAccount } from './component/StatusAccount';
import { DataVideoLike } from './component/Provider/DataVideoLike';
import { DataUserFollow } from './component/Provider/DataUserFollow';
import { StoreVideos } from './component/Provider/StoreVideo';
import Protal from './Protal';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <StatusAccount>
      <StoreVideos>
        <VolumeProvider>
          <DataVideoLike>
            <DataUserFollow>
              <App />
              <Protal />
            </DataUserFollow>
          </DataVideoLike>
        </VolumeProvider>
      </StoreVideos>
    </StatusAccount>
  </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
