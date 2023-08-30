import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import sytles from './AccountSideBar.module.scss';
import AccountItem from './AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Images/Images';

const cx = classNames.bind(sytles);

function AccountSideBar({ label, data }) {
  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('block-main')}>
        <p className={cx('label-sidebar')}>{label}</p>
        {data.map((item) => (
          <AccountItem data={item} key={item.id}>
            <div>
              <Link to={`/@${item.nickname}`} className={cx('block-info')}>
                <Image src={item.avatar} alt={item.nickname} className={cx('avatar')} />
                <div className={cx('infor-item')}>
                  <span className={cx('username')}>
                    {handelNameNull(item.first_name, item.last_name)}
                    {item.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                  </span>
                  <p className={cx('nickname')}>{item.nickname}</p>
                </div>
              </Link>
            </div>
          </AccountItem>
        ))}
      </div>
    </div>
  );
}
AccountSideBar.protoTypes = {
  label: PropTypes.string.isRequired,
};
export default AccountSideBar;
