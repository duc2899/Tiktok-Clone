import VideoDetail from '~/layouts/components/VideoDetail';
import ConfirmModal from '~/component/ConfirmModal';
import { useState, useContext } from 'react';
import HomeForYou from '~/layouts/components/HomeForYou';
import { StatusAcc } from '~/component/StatusAccount';
import SkeletonAdmin from '~/layouts/Skeletion/SkeletonAdmin';
import { Suspense } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import FollowingLogout from '~/layouts/components/FollowingLogOut';
function Following() {
  const getIsLogin = useContext(StatusAcc);
  const isLogin = getIsLogin.isLogin;

  return isLogin ? (
    <Suspense fallback={<SkeletonAdmin></SkeletonAdmin>}>
      <HomeForYou randomPage={false} typeOfPage={'following'}></HomeForYou>
    </Suspense>
  ) : (
    <FollowingLogout></FollowingLogout>
  );
}

export default Following;
