import { lazy, React, Suspense } from 'react';
import SkeletonFollowing from '~/layouts/Skeletion/SkeletonFollowing';
const HomeForYou = lazy(() => import('~/layouts/components/HomeForYou'));
function Home() {
  return (
    <Suspense fallback={<SkeletonFollowing></SkeletonFollowing>}>
      <HomeForYou randomPage={true} typeOfPage={'for-you'} />
    </Suspense>
  );
}

export default Home;
