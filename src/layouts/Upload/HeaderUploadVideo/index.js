import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from '../Upload.module.scss';
import Button from '~/component/Button/Button';
import { Scissors, Split } from '~/component/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function HeaderUploadVideo({ fileVideo, totalTime, name }) {
  const [nameVideo, seNameVideo] = useState(fileVideo.name.split('.')[0]);

  let minVideo = () => {
    return totalTime.split(':')[0];
  };
  let secVideo = () => {
    return totalTime.split(':')[1];
  };

  let total = () => {
    return (minVideo() === '00' ? '' : minVideo() + 'm') + secVideo() + 's';
  };
  useEffect(() => {
    seNameVideo(name);
  }, [name]);
  return (
    <div className={cx('header-upload-video')}>
      <div className={cx('video-edit')}>
        <span className={cx('video-edit-left')}>1</span>
        <div className={cx('video-edit-center')}>
          <video src={fileVideo.preview}></video>
          <div className={cx('video-edit-info')}>
            <span className={cx('name-video')}>{nameVideo}</span>
            <span className={cx('time-video')}>
              <span>00:00</span>-
              <span className={cx('end-time')}>
                <span className={cx('min')}>{minVideo()}</span>:<span className={cx('sec')}>{secVideo()}</span>
              </span>
              <span className={cx('total-time')}>{total()}</span>
            </span>
          </div>
          <div className={cx('video-edit-right')}>
            <Button leftICon={<Scissors></Scissors>} primary>
              Edit video
            </Button>
          </div>
        </div>
      </div>
      <div className={cx('video-split')}>
        <div className={cx('video-split-left')}>
          <p className={cx('video-split-title')}>Split into multiple parts to get more exposure</p>
          <p className={cx('video-split-count')}>
            <span className={cx('video-split-control')}>
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </span>
            <span className={cx('video-split-number')}>2</span>

            <span className={cx('video-split-control')}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </span>
          </p>
        </div>
        <div className={cx('video-split-right')}>
          <Button leftICon={<Split></Split>} nonBG>
            Split
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderUploadVideo;
