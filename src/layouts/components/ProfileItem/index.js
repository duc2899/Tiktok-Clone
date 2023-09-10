import { json, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext, lazy } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { Suspense } from 'react';

import sytles from './Profile.module.scss';
import Image from '~/component/Images/Images';
import Button from '~/component/Button/Button';
import * as userService from '~/component/Services/userService';
import Liked from './Liked';
import Menu from '../../Popper/Menu/Menu';
import { SHARE_MENU, ANOTHER_MENU } from '~/component/StoreMenu';
import { Locked, Share, ThreeDots, IconTabVideos, IconUnFollow } from '~/component/Icons';
import { StatusAcc } from '~/component/StatusAccount';
import Modal from '~/layouts/Modal';
import EditProfile from '../EditProfile';
import { DataUserFollowNew } from '~/component/Provider/DataUserFollow';
import * as followUserService from '~/component/Services/followUserService';
import { DataVideosArray } from '~/component/Provider/StoreVideo';
import SkeletonProfile from '~/layouts/Skeletion/SkeletionProfile';
const Videos = lazy(() => import('./Videos'));
const cx = classNames.bind(sytles);

function ProfileItem() {
  const contextVideos = useContext(DataVideosArray);
  const getIsLogin = useContext(StatusAcc);

  const dataMyself = getIsLogin.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  let location = useLocation();
  const [data, setData] = useState({});
  const [currentTab, setCurrentTab] = useState(1);
  const [actionFollow, setActionFollow] = useState({});
  const [isFollow, setFollow] = useState(false);
  useEffect(() => {
    if (location.pathname !== undefined) {
      const fetchApi = async () => {
        const result = await userService.user(location.pathname, JSON.parse(localStorage.getItem('token')));
        setData(result);
        if (result.id === getIsLogin.data.id) {
          contextVideos.setVideo(result.videos);
        } else {
          contextVideos.setVideo(result.videos.filter((item) => item.viewable !== 'private'));
        }
      };
      fetchApi();
    }
  }, [location.pathname, getIsLogin.data]);
  const handelTab = (id) => {
    setCurrentTab(id);
  };

  //  handel Follow
  const providerFollowUser = useContext(DataUserFollowNew);
  const handelUnFollow = () => {
    setActionFollow({
      id: data.id,
      action: 'unfollow',
    });
  };
  const handelFollow = () => {
    setActionFollow({
      id: data.id,
      action: 'follow',
    });
  };
  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };
  const fetchApi = async (data) => {
    try {
      const result = await followUserService.followUser(
        data.id,
        JSON.parse(localStorage.getItem('token')),
        data.action,
      );
      providerFollowUser.setUserFollow({
        id: data.id,
        isFollow: result.data.is_followed,
      });
      setFollow(result.data.is_followed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Object.getOwnPropertyNames(actionFollow).length !== 0) {
      fetchApi(actionFollow);
    }
  }, [actionFollow]);

  useEffect(() => {
    setFollow(data.is_followed);
  }, [data.is_followed]);
  const Tabs = [
    {
      id: 1,
      title: 'Videos',
      content:
        data.videos !== undefined && data.videos.length !== 0 ? (
          data.id === dataMyself.id ? (
            data.videos.map((video) => (
              <Suspense fallback={<SkeletonProfile></SkeletonProfile>}>
                <Videos key={video.id} data={video} />
              </Suspense>
            ))
          ) : (
            data.videos.map(
              (video) =>
                video.viewable !== 'private' && (
                  <Suspense fallback={<SkeletonProfile></SkeletonProfile>}>
                    <Videos key={video.id} data={video} />
                  </Suspense>
                ),
            )
          )
        ) : (
          <div className={cx('wrapper-noneVideos')}>
            <div>
              <IconTabVideos />
              {dataMyself.id === data.id ? (
                <>
                  <p className={cx('p-1')}>Upload your first video</p>
                  <p className={cx('p-2')}>Your videos will appear here</p>
                </>
              ) : (
                <>
                  <p className={cx('p-1')}>No content</p>
                  <p className={cx('p-2')}>This user has not published any videos.</p>
                </>
              )}
            </div>
          </div>
        ),
    },
    {
      id: 2,
      title: 'Liked',
      content: <Liked data={data.first_name + data.last_name} />,
      icon: <Locked />,
    },
  ];

  //
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('shareInfor')}>
          <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
          <div className={cx('wrappSide')}>
            <div className={cx('userName')}>
              <h1>
                {handelNameNull(data.first_name, data.last_name)}
                {data.tick && <FontAwesomeIcon icon={faCheckCircle} />}
              </h1>
            </div>
            <div className={cx('nickname')}>{data.nickname}</div>
            {dataMyself.id !== data.id ? (
              getIsLogin.isLogin === false ? (
                <Button large long primary onClick={() => setIsOpen(true)}>
                  Follow
                </Button>
              ) : isFollow === false ? (
                <Button large primary className={cx('btn-follow')} onClick={handelFollow}>
                  Follow
                </Button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button large outline className={cx('btn-follow')}>
                    Message
                  </Button>
                  <Tippy content="Unfollow" placement="bottom">
                    <button className={cx('btn-unfollow')} onClick={handelUnFollow}>
                      <IconUnFollow></IconUnFollow>
                    </button>
                  </Tippy>
                </div>
              )
            ) : (
              <Button
                border
                small
                leftICon={<FontAwesomeIcon icon={faPenToSquare} />}
                onClick={() => setIsOpenEdit(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        <div className={cx('countInfor')}>
          <span className={cx('Following')}>
            <strong className={cx('number')}>{data.followings_count}</strong>
            <span className={cx('title')}>Following</span>
          </span>
          <span className={cx('Followers')}>
            <strong className={cx('number')}>{data.followers_count}</strong>
            <span className={cx('title')}>Followers</span>
          </span>
          <span className={cx('Likes')}>
            <strong className={cx('number')}>{data.likes_count}</strong>
            <span className={cx('title')}>Likes</span>
          </span>
        </div>
        {data.bio === '' ? <div className={cx('bio')}>No bio yet.</div> : <div className={cx('bio')}>{data.bio}</div>}
        <div className={cx('contactLinks')}>
          {data.website_url && (
            <a rel="noreferrer" className={cx('link')} target="_blank" href={data.website_url}>
              {data.website_url}
            </a>
          )}
          {data.youtube_url && (
            <a rel="noreferrer" className={cx('link')} target="_blank" href={data.youtube_url}>
              {data.youtube_url}
            </a>
          )}
          {data.facebook_url && (
            <a rel="noreferrer" className={cx('link')} target="_blank" href={data.facebook_url}>
              {data.facebook_url}
            </a>
          )}
          {data.instagram_url && (
            <a rel="noreferrer" className={cx('link')} target="_blank" href={data.instagram_url}>
              {data.instagram_url}
            </a>
          )}
        </div>
        <div className={cx('btn-acitons')}>
          <Menu items={SHARE_MENU} expand="active" spaceIcon>
            <div>
              <Share />
            </div>
          </Menu>
          <Menu items={ANOTHER_MENU} spaceIcon>
            <div>
              <ThreeDots />
            </div>
          </Menu>
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('block-tab')}>
          <div className={cx('tabs')}>
            {Tabs.map((tab) => (
              <span key={tab.id} className={cx('title')} onClick={() => handelTab(tab.id)}>
                <div className={cx('wrapper-titel-icon')}>
                  {tab.icon}
                  {tab.title}
                </div>
              </span>
            ))}
            <div style={{ left: `${currentTab === 1 ? '0%' : '13%'}` }} className={cx('line')}></div>
          </div>
        </div>
        <div className={cx('list-videos')}>
          {Tabs.map((tab) => (
            <div className={cx('wrapper-videos')} key={tab.id}>
              {currentTab === tab.id && tab.content}
            </div>
          ))}
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
      <EditProfile open={isOpenEdit} onClose={() => setIsOpenEdit(false)}></EditProfile>
    </div>
  );
}

export default ProfileItem;
