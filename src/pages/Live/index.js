import ConfirmModal from '~/component/ConfirmModal';
import { useState } from 'react';
function Live() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)}>open</button>
      {openModal && <ConfirmModal openModal={openModal} closeModal={setOpenModal} isLogout></ConfirmModal>}
    </>
  );
}

export default Live;
