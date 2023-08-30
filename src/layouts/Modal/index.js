import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sytle from './Modal.module.scss';
import classNames from 'classnames/bind';
import { MENU_LOGIN_SIGNUP } from '~/component/StoreMenu';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
const cx = classNames.bind(sytle);

function Modal({ open, onClose }) {
  const [toggle, setToggle] = useState(0);
  const [hasChildren, setHasChildren] = useState([]);

  if (open) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }
  const render = () => {
    return hasChildren.length === 0 ? (
      <>
        <h2 className={cx('title')}>{MENU_LOGIN_SIGNUP[toggle].title}</h2>
        <div className={cx('options')}>
          {MENU_LOGIN_SIGNUP[toggle].data.map((option) => {
            const isChildren = !!option.children;
            const handelMenu = () => {
              if (isChildren) {
                setHasChildren((prev) => [...prev, option.children]);
              }
            };

            return (
              <div key={option.id} className={cx('option')} onClick={handelMenu}>
                <span className={cx('icon-option')}>{option.icon}</span>
                <span className={cx('title-option')}>{option.title}</span>
              </div>
            );
          })}
        </div>
      </>
    ) : (
      hasChildren.map((item, index) => (
        <div key={index}>
          <h2 className={cx('title')}>{item.title}</h2>
          {item.data}
        </div>
      ))
    );
  };
  if (!open) return null;
  return createPortal(
    <div className={cx('wrapper')}>
      <div className={cx('inner-modal', `${open ? 'active-modal' : 'inactive-modal'}`)} id="inner-modal">
        <div className={cx('header-moadal')}>
          {hasChildren.length > 0 && (
            <FontAwesomeIcon
              className={cx('icon-back')}
              icon={faArrowLeft}
              onClick={() => setHasChildren((prev) => prev.slice(0, prev.length - 1))}
            />
          )}
        </div>
        <div className={cx('body-modal')}>{render()}</div>
        {MENU_LOGIN_SIGNUP[0].title === 'Log in to TikTok' && (
          <p className={cx('policy')}>
            By continuing, you agree to TikTok’s
            <a href="https://www.youtube.com/watch?v=KZD89ahR2K0">Terms of Service</a> and confirm that you have read
            TikTok’s <a href="https://www.youtube.com/watch?v=KZD89ahR2K0">Privacy Policy</a>.
          </p>
        )}
        <div className={cx('footer-modal')}>
          {toggle === 0 ? (
            <div>
              <p>Don’t have an account?</p>
              <span
                href=""
                onClick={() => {
                  if (hasChildren.length > 0) {
                    setHasChildren((prev) => prev.slice(0, prev.length - 1));
                  } else {
                    setToggle(1);
                  }
                }}
              >
                Sign up
              </span>
            </div>
          ) : (
            <div>
              <p>Alreday have an account?</p>
              <span
                href=""
                onClick={() => {
                  if (hasChildren.length > 0) {
                    setHasChildren((prev) => prev.slice(0, prev.length - 1));
                  } else {
                    setToggle(0);
                  }
                }}
              >
                Login
              </span>
            </div>
          )}
        </div>
        <div className={cx('icon-close')} onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </div>
    </div>,
    document.getElementById('protal'),
  );
}

export default Modal;
