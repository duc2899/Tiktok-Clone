import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { faEllipsis, faPause, faPlay, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ControlVideo.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { lazy } from 'react';

import { VolumeContext } from '~/component/Provider/VolumeProvider';
import Menu from '~/layouts/Popper/Menu/Menu';
import { MENU_VIDEO_ANOTHER } from '~/component/StoreMenu';

const cx = classNames.bind(styles);
const VideoDetail = lazy(() => import('../../VideoDetail'));

function ControlVideo({ data, typeOfPage }) {
  // console.log(data);

  const videoRef = useRef(null);
  const contextVolume = useContext(VolumeContext);
  const [play, setPlay] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const [openDetailVideo, setOpenDetailVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let location = window.location.pathname;
  useEffect(() => {
    if (location == '/') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);
  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play, videoRef]);

  useEffect(() => {
    videoRef.current.volume = contextVolume.volume / 100;
  }, [contextVolume.volume, videoRef]);

  useEffect(() => {
    if (isVisible && isOpen) {
      let playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            setPlay(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlay(false);
    }
  }, [isVisible, isOpen]);

  useEffect(() => {
    if (!openDetailVideo) {
      document.body.classList.remove('active');
      window.history.replaceState(
        `${window.location.origin + `/videoDetail/${data.id}`}`,
        'Sample Title',
        `${window.location.origin + `/${typeOfPage == 'for-you' ? '' : typeOfPage}`}`,
      );
    } else {
      window.history.replaceState(
        `${window.location.origin}`,
        'Sample Title',
        `${window.location.origin + `/${typeOfPage == 'for-you' ? '' : typeOfPage}`}`,
      );

      videoRef.current.pause();
      document.body.classList.add('active');
      setOpenDetailVideo(true);
    }
  }, [openDetailVideo]);
  return (
    <div className={cx('wrapper')}>
      <VisibilitySensor
        onChange={(isVisible) => {
          setIsVisible(isVisible);
        }}
      >
        <div style={{ position: 'relative' }}>
          <video
            src={data.file_url}
            onLoadStart={() => setLoader(true)}
            onLoadedData={() => setLoader(false)}
            loop
            muted={openDetailVideo}
            onClick={() => setOpenDetailVideo(true)}
            ref={videoRef}
            className={cx(
              `${data.meta.video.resolution_x < data.meta.video.resolution_y && 'video-small'}`,
              `${data.meta.video.resolution_y <= data.meta.video.resolution_x && 'video-big'}`,
              'block-video',
            )}
          ></video>

          {loader && <div className={cx('loader')}></div>}
        </div>
      </VisibilitySensor>
      <div className={cx('acitons')} style={{ opacity: `${contextVolume.volume <= 0 ? '1' : ''}` }}>
        <div className={cx('acitons-btn')}>
          {play ? (
            <FontAwesomeIcon className={cx('icon')} icon={faPause} onClick={() => setPlay(false)} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faPlay} onClick={() => setPlay(true)} />
          )}

          <div className={cx('block-volume')}>
            {contextVolume.volume < 2 ? (
              <FontAwesomeIcon
                icon={faVolumeMute}
                className={cx('icon-volume', 'icon', 'icon-mute')}
                onClick={() => contextVolume.setVolume(100)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className={cx('icon-volume', 'icon')}
                onClick={() => contextVolume.setVolume(0)}
              />
            )}
            <div className={cx('controls-volume')}>
              <div style={{ position: 'relative' }}>
                <div className={cx('line-layout')}></div>
                <div style={{ transform: `scaleY(${contextVolume.volume / 100})` }} className={cx('line-val')}></div>
                <input
                  value={contextVolume.volume}
                  type="range"
                  className={cx('volume-val')}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(e) => contextVolume.setVolume(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Menu items={MENU_VIDEO_ANOTHER} spaceIcon customPlaceMent="right">
          <div className={cx('another-actions')}>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </Menu>
        {openDetailVideo && (
          <ErrorBoundary>
            <VideoDetail video={data} onExitDetail={setOpenDetailVideo}></VideoDetail>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default ControlVideo;
