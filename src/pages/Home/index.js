import { lazy, React, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import SkeletonAdmin from '~/layouts/Skeletion/SkeletonAdmin';
const HomeForYou = lazy(() => import('~/layouts/components/HomeForYou'));
function Home() {
  // const navigator = useNavigate();
  return (
    <Suspense fallback={<SkeletonAdmin></SkeletonAdmin>}>
      <HomeForYou randomPage={true} typeOfPage={'for-you'} />
    </Suspense>
  );
}

export default Home;
