import React, { useEffect, useLayoutEffect, useRef, useState, useContext } from 'react';
import style from './Upload.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCloudArrowUp,
  faCloudUpload,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import HeaderUploadVideo from './HeaderUploadVideo';
import imgaes from '~/asset/images';
import Image from '~/component/Images/Images';
import { StatusAcc } from '~/component/StatusAccount';
import VideoSetupRight from './VideoSetupRight';
import ConfirmModal from '~/component/ConfirmModal';

const cx = classNames.bind(style);

function UploadLayout(props) {
  const dataLogin = useContext(StatusAcc);
  const [fileVideo, setFileVideo] = useState(null);
  const [totalTime, setTotalTime] = useState('00:00');
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(true);
  const [valueTimeVideo, setValueTimeVideo] = useState(0);

  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);
  const [nameVideo, setNameVideo] = useState('');
  const [musicVideo, setMusicVideo] = useState('Original sound');
  const [activeEdit, setActiveEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current !== null) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play, videoRef.current]);
  useEffect(() => {
    if (videoRef.current !== null) {
      if (!volume) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = 1;
      }
    }
  }, [volume, videoRef.current]);
  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current !== undefined && fileVideo !== null) {
        convertTime(videoRef.current.duration);
      }
    }, 300);
  }, [fileVideo]);

  function convertTime(millis) {
    var minutes = Math.floor(millis / 60);
    var seconds = Math.floor(millis % 60);
    setTotalTime((minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }
  useEffect(() => {
    return () => fileVideo && URL.revokeObjectURL(fileVideo.preview);
  }, [fileVideo]);
  const handelDragOver = (e) => {
    e.preventDefault();
  };
  const handelDrop = (e) => {
    e.preventDefault();
    setActiveEdit(true);
    const file = e.dataTransfer.files[0];
    file.preview = URL.createObjectURL(file);
    setFileVideo(file);
    if (file) {
      setNameVideo(file.name.split('.')[0]);
    }
  };
  const handelChangeFileVideo = (e) => {
    e.preventDefault();
    setActiveEdit(true);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFileVideo(file);
    if (file) {
      setNameVideo(file.name.split('.')[0]);
    }
  };
  const handelPlayVideo = () => {
    setPlay(!play);
  };
  const handelTimeUpdate = (e) => {
    setValueTimeVideo((e.target.currentTime / e.target.duration) * 100);
    setCurrentTimeSec(Math.floor(e.target.currentTime) % 60);
    setCurrentTimeMin(Math.floor(e.target.currentTime / 60));
  };
  const handelSeekVideo = (e) => {
    videoRef.current.currentTime = (videoRef.current.duration / 100) * e.target.value;
    setPlay(false);
    videoRef.current.pause();
  };
  const handelChange = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (confirm) {
      setOpenModal(false);
      setFileVideo(null);
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <div className={cx('wrapper', `${fileVideo ? 'ver-wrapper' : activeEdit && 'noFileVideo'}`)}>
      {fileVideo && (
        <HeaderUploadVideo fileVideo={fileVideo} totalTime={totalTime} name={nameVideo}></HeaderUploadVideo>
      )}
      <div className={cx('main-content', `${fileVideo && 'ver-main'}`)}>
        <div className={cx('inner')}>
          {activeEdit ? (
            <div>
              <div className={cx('post-title')}>
                <h2>Upload video</h2>
                <p>Post a video to your account</p>
              </div>
              <div className={cx('video-setup')}>
                <div className={cx('video-setup-left')}>
                  {fileVideo ? (
                    <div className={cx('mobile-container')}>
                      <div className={cx('video-space')}>
                        <video src={fileVideo?.preview} ref={videoRef} onTimeUpdate={handelTimeUpdate}></video>
                      </div>
                      <div className={cx('overlay-space')}>
                        <header>
                          <img src={imgaes.live} alt="#"></img>
                          <div className={cx('heder-text')}>
                            <span>Following</span>
                            <span className={cx('border')}>For You</span>
                          </div>
                          <img src={imgaes.search} alt="#"></img>
                        </header>
                        <section>
                          <div className={cx('section-right')}>
                            <Image src={dataLogin.data.avatar} className={cx('avatar-static')}></Image>
                            <img src={imgaes.buttonsSide} alt="#"></img>
                            <p className={cx('bg-avatar-dynamic')}>
                              <Image
                                src={dataLogin.data.avatar}
                                className={cx('avatar-dynamic', `${play && 'rotate-img'}`)}
                              ></Image>
                            </p>
                            <p className={cx('icon-music')}>
                              <span className={cx('span-1', `${play && 'active-music'}`)}></span>
                              <span className={cx('span-2', `${play && 'active-music'}`)}></span>
                              <span className={cx('span-3', `${play && 'active-music'}`)}></span>
                            </p>
                          </div>
                          <div className={cx('section-bottom')}>
                            <p className={cx('user-name')}>@{dataLogin.data.nickname}</p>
                            <p className={cx('name-video')}>{nameVideo}</p>
                            <div className={cx('music-bar')}>
                              <div className={cx('music-thumb-wrapper')}>
                                <div className={cx('music-thumb')}>
                                  <span>
                                    {musicVideo === '' ? 'Original sound' : musicVideo} - {dataLogin.data.nickname}
                                  </span>
                                  <span>
                                    {musicVideo === '' ? 'Original sound' : musicVideo} - {dataLogin.data.nickname}
                                  </span>
                                  <span>
                                    {musicVideo === '' ? 'Original sound' : musicVideo} - {dataLogin.data.nickname}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <footer></footer>
                      </div>
                      <div className={cx('control-space')} onClick={handelPlayVideo}>
                        <section></section>
                      </div>
                      <div className={cx('block-controlVideo')}>
                        <div className={cx('time-control')}>
                          <button onClick={() => setPlay(!play)}>
                            {!play ? (
                              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                            ) : (
                              <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                            )}
                          </button>
                          <div>
                            <span>
                              <span className={cx('min')}>
                                {currentTimeMin < 10 ? '0' + currentTimeMin : currentTimeMin}
                              </span>
                              :
                              <span className={cx('sec')}>
                                {currentTimeSec < 10 ? '0' + currentTimeSec : currentTimeSec}
                              </span>
                            </span>
                            /<span>{totalTime}</span>
                          </div>
                          <button onClick={() => setVolume(!volume)}>
                            {volume ? (
                              <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>
                            ) : (
                              <FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon>
                            )}
                          </button>
                        </div>
                        <div className={cx('progress-control')}>
                          <div className={cx('progress-bar')} style={{ width: valueTimeVideo + '%' }}>
                            <p
                              className={cx('dot')}
                              style={{ transform: `translate(calc(0% - ${valueTimeVideo}%),0%)` }}
                            ></p>
                          </div>
                          <input
                            value={valueTimeVideo}
                            onInput={handelSeekVideo}
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={cx('chosse-file-edit')}>
                      <label htmlFor="fileVideo">
                        <div className={cx('upload-file-container')} onDragOver={handelDragOver} onDrop={handelDrop}>
                          <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: '#b9babb' }}></FontAwesomeIcon>
                          <h3 className={cx('title')}>Select video to upload</h3>
                          <span className={cx('hint')}>Or drag and drop a file</span>
                          <span className={cx('hint')}>
                            Long videos can be split into multiple parts to get more exposure
                          </span>
                          <div className={cx('des-block')}>
                            <span>MP4 or WebM</span>
                            <span>720x1280 resolution or higher</span>
                            <span>Up to 30 minutes</span>
                            <span>Less than 2 GB</span>
                          </div>
                          <div className={cx('btn-upload')} aria-label="Select file">
                            <div>Select file</div>
                          </div>
                        </div>

                        <input
                          type="file"
                          id="fileVideo"
                          accept="video/*"
                          hidden
                          onChange={(e) => handelChangeFileVideo(e)}
                        />
                      </label>
                    </div>
                  )}
                  {fileVideo !== null && (
                    <div className={cx('change-video-container')}>
                      <div className={cx('video-name')}>
                        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                        {fileVideo?.name}
                      </div>
                      <div className={cx('btn-changeVideo')} onClick={handelChange}>
                        Change video
                      </div>
                    </div>
                  )}
                </div>
                <VideoSetupRight
                  nameVideo={fileVideo?.name}
                  setNameVideo={setNameVideo}
                  musicVideo={musicVideo}
                  setMusicVideo={setMusicVideo}
                  fileVideo={fileVideo}
                  totalTime={totalTime}
                  setConfirmReplace={setConfirm}
                  nameUer={dataLogin.data.nickname}
                ></VideoSetupRight>
              </div>
            </div>
          ) : (
            <label htmlFor="fileVideo">
              <div className={cx('upload-file-container')} onDragOver={handelDragOver} onDrop={handelDrop}>
                <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: '#b9babb' }}></FontAwesomeIcon>
                <h3 className={cx('title')}>Select video to upload</h3>
                <span className={cx('hint')}>Or drag and drop a file</span>
                <span className={cx('hint')}>Long videos can be split into multiple parts to get more exposure</span>
                <div className={cx('des-block')}>
                  <span>MP4 or WebM</span>
                  <span>720x1280 resolution or higher</span>
                  <span>Up to 30 minutes</span>
                  <span>Less than 2 GB</span>
                </div>
                <div className={cx('btn-upload')} aria-label="Select file">
                  <div>Select file</div>
                </div>
              </div>

              <input type="file" id="fileVideo" accept="video/*" hidden onChange={(e) => handelChangeFileVideo(e)} />
            </label>
          )}
        </div>
      </div>
      {openModal && (
        <ConfirmModal
          openModal={openModal}
          closeModal={setOpenModal}
          confirmModal={setConfirm}
          form_twice
          contentBody={'Replace this video?'}
          contentBtnLeft={'Continue editing'}
          contentBtnRight={'Replace'}
          contentDes={'Caption and video settings will still be saved.'}
        ></ConfirmModal>
      )}
    </div>
  );
}

export default UploadLayout;
