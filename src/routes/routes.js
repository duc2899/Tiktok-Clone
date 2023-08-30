import { HeaderOnly } from '~/layouts';

import config from '~/component/Config';
import Home from '~/pages/Home';
import Following from '~/pages/Follwing';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Live from '~/pages/Live';
const publicRoutes = [
  { path: config.routes.home, component: Home, index: true },
  { path: config.routes.following, component: Following, index: false },
  { path: config.routes.live, component: Live, index: false },
  { path: config.routes.profile, component: Profile, index: false },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly, index: false },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
