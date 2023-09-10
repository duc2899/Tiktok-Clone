import ConfirmModal from '~/component/ConfirmModal';
import { useState } from 'react';
import SkeletonFollowing from '~/layouts/Skeletion/SkeletonFollowing';
import SkeletonProfile from '~/layouts/Skeletion/SkeletionProfile';
function Live() {
  const [openModal, setOpenModal] = useState(false);

  return <SkeletonProfile></SkeletonProfile>;
}

export default Live;
