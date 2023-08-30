import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames/bind';
import sytles from './HomeForYou.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Image from '~/component/Images/Images';
import ControlVideo from './ControlVideo';
import { IconHeart, IconShare, IconMessage, IconFavourite } from '~/component/Icons';
import * as userService from '~/component/Services/forYoutService';
import AccountItem from '~/component/AccountSideBar/AccountItem';
import Menu from '~/layouts/Popper/Menu/Menu';
import { SHARE_MENU } from '~/component/StoreMenu';
import { StatusAcc } from '~/component/StatusAccount';
import ButtonFollow from './ControlButton/ButtonFollow';
import Modal from '~/layouts/Modal';
import ControlButton from './ControlButton';
import { DataUserFollowNew } from '~/component/Provider/DataUserFollow';
import { DataVideosArray } from '~/component/Provider/StoreVideo';

const cx = classNames.bind(sytles);

function HomeForYou({ randomPage = false, typeOfPage }) {
  const getIsLogin = useContext(StatusAcc);
  const isLogin = getIsLogin.isLogin;

  const [data, setData] = useState([]);
  const [pageRandom, setPageRandom] = useState(Math.floor(Math.random() * 10));
  const [page, setPage] = useState(1);
  const [typePage, setTypePage] = useState(typeOfPage);

  const [isOpen, setIsOpen] = useState(false);

  const providerFollowUser = useContext(DataUserFollowNew);
  const providerVideos = useContext(DataVideosArray);

  useEffect(() => {
    providerVideos.setVideo([]);
    setTypePage(typeOfPage);
  }, [typeOfPage]);

  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };
  const handelLinkMusic = (linkMusic, nickName) => {
    if (linkMusic == '') {
      return ` original sound - ${nickName}`;
    } else {
      return linkMusic;
    }
  };
  const fetchApiHome = async () => {
    try {
      const result = await userService.forYou(pageRandom, typePage);
      setPageRandom((prevPage) => prevPage + 2);
      setData((prevItems) => [...prevItems, ...result]);
      providerVideos.setVideo((prevItems) => [...prevItems, ...result]);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApiFollowing = async () => {
    try {
      const result = await userService.forYou(page, typePage);
      setPage((prevPage) => prevPage + 1);
      setData((prevItems) => [...prevItems, ...result]);

      providerVideos.setVideo((prevItems) => [...prevItems, ...result]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    randomPage ? fetchApiHome() : fetchApiFollowing();
  }, [randomPage]);

  useEffect(() => {
    const newData = data.map((item) => {
      if (item.user.id === providerFollowUser.userFollow.id) {
        item.user.is_followed = providerFollowUser.userFollow.isFollow;
        return item;
      } else {
        return item;
      }
    });
    setData(newData);
  }, [providerFollowUser.userFollow.isFollow]);
  return (
    <div className={cx('wrapper')}>
      <InfiniteScroll
        dataLength={data.length}
        next={randomPage ? fetchApiHome : fetchApiFollowing}
        hasMore={true}
        style={{ height: '', overflow: 'hidden' }}
      >
        <div className={cx('list-items')}>
          {data.map((item) => (
            <div className={cx('item', 'videoHome')} key={item.id}>
              <Link to={`/@${item.user.nickname}`} target="_blank" className={cx('avatar-link')}>
                <div className={cx('block-avatar')}>
                  <AccountItem data={item.user}>
                    <Image src={item.user.avatar} alt="" className={cx('avatar')} />
                  </AccountItem>
                </div>
              </Link>

              <div className={cx('main-item')}>
                <div className={cx('main-item-header')}>
                  <AccountItem data={item.user}>
                    <div className={cx('infor')}>
                      <Link to={`/@${item.user.nickname}`}>
                        <h3 className={cx('username')}>{handelNameNull(item.user.first_name, item.user.last_name)}</h3>
                        {item.user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-check')} />}
                        <h4 className={cx('nickname')}>{item.user.nickname}</h4>
                      </Link>
                    </div>
                  </AccountItem>
                  <div className={cx('des')}>{item.description}</div>
                  <div className={cx('link-music')}>♫ {handelLinkMusic(item.music, item.user.nickname)}</div>
                </div>
                <div className={cx('main-item-body')}>
                  <ControlVideo data={item} dataVideoFull={data} />
                  {isLogin === false ? (
                    <div className={cx('list-btn-acitons')}>
                      <button className={cx('item-btn')} onClick={() => setIsOpen(true)}>
                        <span>
                          <IconHeart />
                        </span>
                        <strong className={cx('likes-count')}>{item.likes_count}</strong>
                      </button>
                      <button className={cx('item-btn')} onClick={() => setIsOpen(true)}>
                        <span>
                          <IconMessage />
                        </span>
                        <strong className={cx('comments-count')}>{item.comments_count}</strong>
                      </button>
                      <button className={cx('item-btn')} onClick={() => setIsOpen(true)}>
                        <span>
                          <IconFavourite />
                        </span>
                        <strong className={cx('favourites-count')}>11</strong>
                      </button>
                      <Menu items={SHARE_MENU} spaceIcon expand="active" customPlaceMent="top" customOffset={[80, 240]}>
                        <button className={cx('item-btn')} onClick={() => setIsOpen(true)}>
                          <span>
                            <IconShare />
                          </span>
                          <strong className={cx('shares-count')}>{item.shares_count}</strong>
                        </button>
                      </Menu>
                    </div>
                  ) : (
                    <ControlButton item={item}></ControlButton>
                  )}
                </div>
              </div>

              <div className={cx('btn-follow')}>
                <ButtonFollow dataUser={item.user !== undefined && item.user}></ButtonFollow>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
}

export default HomeForYou;
