import classNames from 'classnames/bind';
import style from './FollowingLogOut.module.scss';
import Button from '~/component/Button/Button';
import { useEffect, useRef, useState } from 'react';
import * as suggestedService from '~/component/Services/suggestedService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/component/Images/Images';
import Modal from '~/layouts/Modal';

const cx = classNames.bind(style);

function FollowingLogout() {
  const videoRef = useRef();
  const [data, setData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(false);
  const [startPlayVideo, setStartPlayVideo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [videoID, setVideoID] = useState();
  const videos = document.querySelectorAll('video');
  if (videoID === undefined) {
    videos[0]?.play();
  }
  useEffect(() => {
    videos.forEach((e) => {
      if (parseInt(e.getAttribute('videoid')) == videoID) {
        e.play();
      } else {
        e.pause();
      }
    });
  }, [videoID]);

  const handelLoadVideo = () => {
    setStartPlayVideo(true);
  };

  const fetchApi = async () => {
    const result = await suggestedService.suggestedAcc(1, 18);
    setData(result);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div className={cx('suggest-list')}>
      {data.map((item) => (
        <div className={cx('suggest-item')} key={item.id}>
          <Link to={`/@${item.nickname}`} target="_blank" onMouseOver={() => setVideoID(item.id)}>
            <div className={cx('video-wrapper')}>
              <div className={cx('inner-content')}>
                <img alt="" src={item.popular_video.thumb_url}></img>
                <video
                  videoid={item.id}
                  ref={videoRef}
                  onLoadStart={handelLoadVideo}
                  className={cx(`${activeVideo && 'active-Video'}`)}
                  src={item.popular_video.file_url}
                  loop
                  muted
                  style={{ zIndex: '3' }}
                ></video>
              </div>
              <div className={cx('infor-acc')}>
                <Image src={item.avatar}></Image>

                <p className={cx('username')}>
                  {item.first_name + item.last_name}
                  {item.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-check')}></FontAwesomeIcon>}
                </p>
                <p className={cx('nickname')}>{item.nickname}</p>
              </div>
            </div>
          </Link>
          <Button small long primary className={cx('btn-follow')} onClick={() => setOpenModal(true)}>
            Follow
          </Button>
        </div>
      ))}
      <Modal open={openModal} onClose={() => setOpenModal(false)}></Modal>
    </div>
  );
}

export default FollowingLogout;
