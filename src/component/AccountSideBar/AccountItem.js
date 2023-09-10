import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Image from '../Images/Images';
import { Wrapper as WrapperPopper } from '~/layouts/Popper';
import sytles from './AccountSideBar.module.scss';
import ButtonFollow from '~/layouts/components/HomeForYou/ControlButton/ButtonFollow';
import { StatusAcc } from '../StatusAccount';
const cx = classNames.bind(sytles);
function AccountItem({ data, children }) {
  const providerStatusAcc = useContext(StatusAcc);

  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };
  const renderPreview = (attrs) => {
    if (data !== undefined) {
      return (
        <div className={cx('privew')} tabIndex="-1" {...attrs}>
          <WrapperPopper className={cx('wrapper-preview')}>
            <div className={cx('header-privew')}>
              <Image className={cx('avatar')} alt="hello" src={data.avatar} />
              {providerStatusAcc.data.id !== data.id && <ButtonFollow dataUser={data}></ButtonFollow>}{' '}
            </div>
            <div className={cx('body-privew')}>
              <div className={cx('infor')}>
                <span className={cx('username')}>
                  <strong>{handelNameNull(data.first_name, data.last_name)}</strong>
                  {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                </span>
                <span className={cx('nickname')}>{data.nickname}</span>
              </div>
              <div className={cx('infor-index')}>
                <div className={cx('followers')}>
                  <span className={cx('number')}>{data.followers_count}</span>
                  <span className={cx('title')}>Followers</span>
                </div>
                <div className={cx('Likes')}>
                  <span className={cx('number')}>{data.likes_count}</span>
                  <span className={cx('title')}>Likes</span>
                </div>
              </div>
            </div>
          </WrapperPopper>
        </div>
      );
    }
  };
  return (
    <Tippy
      zIndex={9999999999}
      appendTo={document.getElementById('root')}
      interactive
      offset={[10, -2]}
      placement="bottom"
      delay={[800, 0]}
      render={renderPreview}
    >
      {children}
    </Tippy>
  );
}

export default AccountItem;
