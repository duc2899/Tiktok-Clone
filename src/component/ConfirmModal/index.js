import classNames from 'classnames/bind';
import style from './ConfirmModal.module.scss';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
const cx = classNames.bind(style);

function ConfirmModal({ openModal, closeModal, confirmModal, isDeleteComment = false, isLogout = false }) {
  if (!openModal) return null;

  return createPortal(
    <div className={cx('wrapper-bg')}>
      <div className={cx('overlay')}></div>
      {isDeleteComment && (
        <div className={cx('block-modal')}>
          <div className={cx('body-modal')}>Are you sure you want to delete this comment?</div>
          <div className={cx('block-btn')}>
            <button className={cx('btn-accept')} onClick={() => confirmModal(true)}>
              Delete
            </button>
            <button className={cx('btn-cancel')} onClick={() => closeModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {isLogout && (
        <div className={cx('block-modal', 'block-logout')}>
          <div className={cx('body-modal', 'body-modal-logout')}>Are you sure you want to log out?</div>
          <div className={cx('block-btn-logout')}>
            <Button large nonBG onClick={() => closeModal(false)}>
              Cancel
            </Button>
            <Button large outline onClick={() => confirmModal(true)}>
              Log out
            </Button>
          </div>
        </div>
      )}
    </div>,

    document.getElementById('protal'),
  );
}

export default ConfirmModal;
