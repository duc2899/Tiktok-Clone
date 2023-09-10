import classNames from 'classnames/bind';
import style from './ConfirmModal.module.scss';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function ConfirmModal({
  openModal,
  closeModal,
  confirmModal,
  form_first = false,
  form_twice = false,
  contentBody,
  contentBtnLeft,
  contentBtnRight,
  contentDes,
  isTagLink = false,
  toLink,
}) {
  if (!openModal) return null;

  return createPortal(
    <div className={cx('wrapper-bg')}>
      <div className={cx('overlay')}></div>
      {form_first && (
        <div className={cx('block-modal')}>
          <div className={cx('body-modal')}>{contentBody}</div>
          <div className={cx('block-btn')}>
            <button className={cx('btn-cancel', `${isTagLink && 'styeAnother'}`)} onClick={() => closeModal(false)}>
              {contentBtnLeft}
            </button>
            {isTagLink ? (
              <Link to={toLink} className={cx('btn-accept')}>
                {contentBtnRight}
              </Link>
            ) : (
              <button className={cx('btn-accept')} onClick={() => confirmModal(true)}>
                {contentBtnRight}
              </button>
            )}
          </div>
        </div>
      )}
      {form_twice && (
        <div className={cx('block-modal', 'block-logout')}>
          <div className={cx('body-modal', 'body-modal-logout')}>
            {contentBody}

            <div className={cx('body-modal-des')}>{contentDes}</div>
          </div>
          <div className={cx('block-btn-logout')}>
            <Button large nonBG onClick={() => closeModal(false)}>
              {contentBtnLeft}
            </Button>
            <Button large outline onClick={() => confirmModal(true)}>
              {contentBtnRight}
            </Button>
          </div>
        </div>
      )}
    </div>,

    document.getElementById('protal'),
  );
}

export default ConfirmModal;
