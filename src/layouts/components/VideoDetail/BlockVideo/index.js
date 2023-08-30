import classNames from 'classnames/bind';
import styles from '../VideoDetail.module.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolumeMute, faVolumeHigh, faXmark } from '@fortawesome/free-solid-svg-icons';
import { VolumeContext } from '~/component/Provider/VolumeProvider';
import { DataVideosArray } from '~/component/Provider/StoreVideo';

const cx = classNames.bind(styles);

function BlockVideo({ dataItem, onExitDetail }) {
  const videoRef = useRef();
  // const [dataVideo, setDataVideo] = useState(dataItem.file_url);

  const contextVolume = useContext(VolumeContext);

  const [valueTimeVideo, setValueTimeVideo] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [loader, setLoader] = useState(false);

  const handelTimeUpdate = (e) => {
    setValueTimeVideo((e.target.currentTime / e.target.duration) * 10);
    setCurrentTimeSec(Math.floor(e.target.currentTime) % 60);
    setCurrentTimeMin(Math.floor(e.target.currentTime / 60));
  };

  useEffect(() => {
    if (playVideo) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playVideo, videoRef]);

  useEffect(() => {
    videoRef.current.volume = contextVolume.volume / 100;
  }, [contextVolume.volume, videoRef]);

  const handelVideoFirstCome = () => {
    setLoader(true);
    setPlayVideo(false);
  };
  const handelVideoLoaded = () => {
    setLoader(false);
    setPlayVideo(true);
  };
  const handelExitModal = () => {
    onExitDetail(false);
  };
  return (
    <div className={cx('video-container')}>
      <div className={cx('video-player')} onClick={() => setPlayVideo(!playVideo)}>
        <p className={cx('video-background')} style={{ backgroundImage: `url(${dataItem.thumb_url})` }}></p>
        <div className={cx('video')}>
          <video
            src={dataItem.file_url}
            onLoadStart={handelVideoFirstCome}
            onLoadedData={handelVideoLoaded}
            onTimeUpdate={(e) => handelTimeUpdate(e)}
            ref={videoRef}
            loop
            autoPlay
            muted={!playVideo}
            className={cx(
              `${dataItem.meta.video.resolution_x < dataItem.meta.video.resolution_y && 'video-small'}`,
              `${dataItem.meta.video.resolution_y <= dataItem.meta.video.resolution_x && 'video-big'}`,
              'block-video',
            )}
          ></video>
          {loader && <div className={cx('loader')}></div>}
          {!playVideo && <FontAwesomeIcon icon={faPlay} className={cx('icon-pause')}></FontAwesomeIcon>}
        </div>
      </div>
      <div
        className={cx(
          'progress-video',
          `${dataItem.meta.video.resolution_x < dataItem.meta.video.resolution_y && 'short'}`,
          `${dataItem.meta.video.resolution_y <= dataItem.meta.video.resolution_x && 'long'}`,
        )}
      >
        <div className={cx('line-layout')}></div>
        <div className={cx('line-val-video')} style={{ transform: `scaleX(${valueTimeVideo / 10})` }}></div>
        <input
          value={valueTimeVideo / 10}
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={(e) => {
            videoRef.current.currentTime = (videoRef.current.duration / 10) * e.target.value * 10;
          }}
        />
        <div className={cx('count-timevideo')}>
          <span className={cx('current-time')}>{`${currentTimeMin <= 9 ? '0' + currentTimeMin : currentTimeMin}:${
            currentTimeSec <= 9 ? '0' + currentTimeSec : currentTimeSec
          }`}</span>
          /<span className={cx('total-time')}>{dataItem.meta.playtime_string}</span>
        </div>
        <div style={{ left: `calc(${valueTimeVideo * 9.5}%)` }} className={cx('circle-thumb')}></div>
      </div>
      <div className={cx('video-volume')}>
        <div className={cx('block-volume')}>
          <div className={cx('button-volume')}>
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
          </div>
          <div className={cx('controls-volume')}>
            <div className={cx('line-layout')}>
              <div style={{ transform: `scaleY(${contextVolume.volume / 100})` }} className={cx('line-val')}></div>
            </div>
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
      <div className={cx('exit-detail')} onClick={handelExitModal}>
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default BlockVideo;
