import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import sytles from './Header.module.scss';
import imgaes from '~/asset/images';
import config from '~/component/Config';

import Button from '~/component/Button/Button';
import Menu from '../../Popper/Menu/Menu';
import Search from './Search/Search';
import Image from '~/component/Images/Images';
import { Inbox, Messages } from '~/component/Icons/Icons';
import Modal from '~/layouts/Modal';
import { useState, useContext, useEffect } from 'react';
import { StatusAcc } from '~/component/StatusAccount';
import { MENU_ITEMS } from '~/component/StoreMenu';
import { Coins, Favorites, LogOut, Settings, User } from '~/component/Icons/Icons';
import ConfirmModal from '~/component/ConfirmModal';
const cx = classNames.bind(sytles);

function Header() {
  const providerLogin = useContext(StatusAcc);
  const login = providerLogin.isLogin;
  const data = providerLogin.data;

  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const handelOnChange = (menuItem) => {
    if (menuItem.title === 'Log out') {
      setOpenModal(true);
    }
  };
  useEffect(() => {
    if (isLogout) {
      providerLogin.setIsLogin(false);
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, [isLogout]);
  const USER_MENU = [
    {
      icon: <User />,
      title: 'View profile',
      to: `/@ ${data.nickname}`,
    },
    {
      icon: <Favorites />,
      title: 'Favorites',
      to: `/@ ${data.nickname}`,
    },
    {
      icon: <Coins />,
      title: 'Get Coins',
      to: '/coin',
    },
    {
      icon: <Settings />,
      title: 'Settings',
      to: '/setting',
    },
    ...MENU_ITEMS,
    {
      icon: <LogOut />,
      title: 'Log out',
      cross: true,
    },
  ];
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to={config.routes.home}>
            <img src={imgaes.logo} alt="Tiktok"></img>
          </Link>
        </div>
        <Search />

        <div className={cx('actions')}>
          {login === false ? (
            <Button leftICon={<FontAwesomeIcon icon={faPlus} />} nonBG onClick={() => setIsOpen(true)}>
              <span>Upload</span>
            </Button>
          ) : (
            <Button leftICon={<FontAwesomeIcon icon={faPlus} />} nonBG to={'/upload'}>
              <span>Upload</span>
            </Button>
          )}
          {login ? (
            <>
              <Tippy content="Messages" placement="bottom">
                <button className={cx('acion-messages')}>
                  <Messages />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('acion-inbox')}>
                  <Inbox />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button primary onClick={() => setIsOpen(true)}>
                Log in
              </Button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
            </>
          )}

          <Menu items={login ? USER_MENU : MENU_ITEMS} onChange={handelOnChange}>
            {login ? (
              <Image className={cx('user-avatar')} alt={data.nickname} src={data.avatar} />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
      {openModal && (
        <ConfirmModal
          openModal={openModal}
          closeModal={setOpenModal}
          confirmModal={setIsLogout}
          isLogout
        ></ConfirmModal>
      )}
    </header>
  );
}

export default Header;
