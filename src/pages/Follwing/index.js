import { lazy, useContext } from 'react';
import { StatusAcc } from '~/component/StatusAccount';
import { Suspense } from 'react';
import SkeletonFollowing from '~/layouts/Skeletion/SkeletonFollowing';

const HomeForYou = lazy(() => import('~/layouts/components/HomeForYou'));
const FollowingLogout = lazy(() => import('~/layouts/components/FollowingLogOut'));
function Following() {
  const getIsLogin = useContext(StatusAcc);

  return getIsLogin.isLogin ? (
    <Suspense fallback={<SkeletonFollowing></SkeletonFollowing>}>
      <HomeForYou randomPage={false} typeOfPage={'following'}></HomeForYou>
    </Suspense>
  ) : (
    <Suspense fallback={<SkeletonFollowing></SkeletonFollowing>}>
      <FollowingLogout isLogin={getIsLogin.isLogin}></FollowingLogout>
    </Suspense>
  );
}

export default Following;
