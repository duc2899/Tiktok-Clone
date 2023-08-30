import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import sytle from '~/layouts/components/HomeForYou/HomeForYou.module.scss';
import Menu from '~/layouts/Popper/Menu/Menu';
import { IconShare, IconMessage, IconFavourite } from '~/component/Icons';
import { SHARE_MENU } from '~/component/StoreMenu';
import ButtonLike from './ButtonLike';
import { DataVideoNew } from '~/component/Provider/DataVideoLike';
const cx = classNames.bind(sytle);

function ControlButton({ item }) {
  const providerVideoLike = useContext(DataVideoNew);

  const handelDataVideoNew = () => {
    if (providerVideoLike.video.id === item.id) {
      item.is_liked = providerVideoLike.video.is_liked;
      item.likes_count = providerVideoLike.video.likes_count;
      return item;
    }
  };

  return (
    <div className={cx('list-btn-acitons')}>
      <ButtonLike item={handelDataVideoNew() === undefined ? item : handelDataVideoNew()}></ButtonLike>
      <button className={cx('item-btn')}>
        <span>
          <IconMessage />
        </span>
        <strong className={cx('comments-count')}>{item.comments_count}</strong>
      </button>
      <button className={cx('item-btn')}>
        <span>
          <IconFavourite />
        </span>
        <strong className={cx('favourites-count')}>11</strong>
      </button>
      <Menu items={SHARE_MENU} spaceIcon expand="active" customPlaceMent="top" customOffset={[80, 240]}>
        <button className={cx('item-btn')}>
          <span>
            <IconShare />
          </span>
          <strong className={cx('shares-count')}>{item.shares_count}</strong>
        </button>
      </Menu>
    </div>
  );
}

export default ControlButton;
