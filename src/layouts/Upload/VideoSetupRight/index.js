import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './VideoSetup.module.scss';
import VideoThumbnail from 'react-video-thumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import imgaes from '~/asset/images';
import Button from '~/component/Button/Button';
import ConfirmModal from '~/component/ConfirmModal';
import { Warning } from '~/component/Icons';
import * as postNewVideoService from '~/component/Services/postNewVideoService';
const cx = classNames.bind(style);

function VideoSetupRight({
  nameVideo,
  setNameVideo,
  setMusicVideo,
  musicVideo,
  fileVideo,
  totalTime,
  setConfirmReplace,
  nameUer,
}) {
  const OPTION_ALLOW_VIDEO = ['public', 'friends', 'private'];
  const VALUE_CHECKBOX = ['comment', 'duet', 'stitch'];
  const textRefCaption = useRef(null);
  const textRefMusic = useRef(null);
  const videoRef = useRef(null);
  const optionRef = useRef(null);
  const [valueCaption, setValueCaption] = useState(nameVideo?.split('.')[0]);
  const [valueMusic, setValueMusic] = useState(musicVideo);
  const [countValueCaption, setCountValueCaption] = useState(valueCaption?.length);
  const [countValueMusic, setCountValueMusic] = useState(valueMusic?.length);
  const [valueTransForm, SetValueTransForm] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const [myOption, setMyOption] = useState(OPTION_ALLOW_VIDEO[0]);
  const [checked, setChecked] = useState([0, 1, 2]);
  const [switchCopyRight, setSwitchCopyRight] = useState(false);
  const [showLoadingCheck, setShowLoadingCheck] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showLoadingPost, setShowLoadingPost] = useState(false);
  const [showResultPost, setShowResultPost] = useState(false);
  //   const [openModalResult, setOpenModalResult] = useState(false);
  useEffect(() => {
    if (fileVideo === null) {
      setValueMusic('Original sound');
      setValueCaption('');
      setSwitchCopyRight(false);
    } else {
      setValueMusic(musicVideo);
      setValueCaption(nameVideo?.split('.')[0]);
      setSwitchCopyRight(false);
    }
  }, [fileVideo]);
  if (showLoadingCheck) {
    setTimeout(() => {
      setShowLoadingCheck(false);
    }, 5000);
  }

  if (showOption) {
    document.body.addEventListener('click', (e) => {
      if (!optionRef.current.contains(e.target)) {
        setShowOption(false);
      }
    });
  }

  let min = parseInt(totalTime.split(':')[0]) * 60;
  let sec = parseInt(totalTime.split(':')[1]);
  const maxLength = min + sec;

  if (textRefCaption.current !== null) {
    textRefCaption.current.textContent = valueCaption;
  }
  if (textRefMusic.current !== null) {
    textRefMusic.current.textContent = valueMusic;
  }
  const handelChangeValueCaption = (e) => {
    if (e.currentTarget.textContent.length > 100) {
      setValueCaption(valueCaption.slice(0, 100));
      textRefCaption.current.innerHTML = valueCaption.slice(0, 100);
    } else {
      setNameVideo(e.currentTarget.textContent);
      setValueCaption(e.currentTarget.textContent);
    }
  };

  const handelChangeValueMusic = (e) => {
    if (e.currentTarget.textContent.length > 50) {
      setValueMusic(valueMusic.slice(0, 50));
      textRefMusic.current.innerHTML = valueMusic.slice(0, 50);
    } else {
      setValueMusic(e.currentTarget.textContent);
      setMusicVideo(e.currentTarget.textContent);
    }
  };
  useEffect(() => {
    setCountValueCaption(valueCaption.length);
  }, [valueCaption]);

  useEffect(() => {
    setCountValueMusic(valueMusic.length);
  }, [valueMusic]);

  const handelHideShowResult = () => {
    setShowResultPost(false);
    setConfirm(true);
  };

  useEffect(() => {
    if (confirm) {
      setOpenModal(false);
      setConfirm(false);
      setConfirmReplace(true);
    }
  }, [confirm]);
  const generateThumbnail = () => (
    <div className={cx('thumbnail-container')}>
      <VideoThumbnail snapshotAtTime={0} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={2} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength - 10} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength - 8} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength - 6} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength - 4} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength - 2} videoUrl={fileVideo?.preview} width={700} height={600} />
      <VideoThumbnail snapshotAtTime={maxLength} videoUrl={fileVideo?.preview} width={700} height={600} />
    </div>
  );
  const handelSeekVideo = (e) => {
    SetValueTransForm(e.target.value);
    videoRef.current.currentTime = (videoRef.current.duration / maxLength) * e.target.value;
  };
  const handelChooseOption = (option) => {
    setMyOption(option);
    setShowOption(false);
  };
  const handelCheck = (i) => {
    setChecked((prev) => {
      const isChecked = checked.includes(i);
      if (isChecked) {
        return checked.filter((item) => item !== i);
      } else {
        return [...prev, i];
      }
    });
  };
  const handelSwitch = () => {
    setSwitchCopyRight(!switchCopyRight);
    setShowLoadingCheck(true);
  };

  const handelPostVideo = () => {
    if (fileVideo !== null && showLoadingPost === false) {
      setShowLoadingPost(true);
      let formdata = new FormData();
      formdata.append('upload_file', fileVideo, fileVideo.preview);
      formdata.append('description', valueCaption);
      formdata.append('music', valueMusic === '' ? `Original sound - ${nameUer}` : valueMusic);
      formdata.append('thumbnail_time', valueTransForm);
      formdata.append('viewable', myOption);
      checked.forEach((e) => {
        formdata.append('allows[]', VALUE_CHECKBOX[e]);
      });
      const fetchApi = async () => {
        try {
          const result = await postNewVideoService.postNewVideo(JSON.parse(localStorage.getItem('token')), formdata);
          if (result !== undefined) {
            setShowResultPost(true);
            setShowLoadingPost(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchApi();
    }
  };
  return (
    <div className={cx('video-setup-right')}>
      <div className={cx('input-container')}>
        <div className={cx('input-value')}>
          <div className={cx('input-header')}>
            <span className={cx('title')}>Caption</span>
            <span className={cx('count-text', `${countValueCaption >= 100 && 'error'}`)}>
              <span>{countValueCaption}</span>/<span>100</span>
            </span>
          </div>
          <div className={cx('input-body')}>
            <div
              ref={textRefCaption}
              contentEditable
              spellCheck
              onInput={handelChangeValueCaption}
              suppressContentEditableWarning
            >
              {' '}
            </div>
          </div>
        </div>
        <div className={cx('input-value')}>
          <div className={cx('input-header')}>
            <span className={cx('title')}>Music in video</span>
            <span className={cx('count-text', `${countValueMusic >= 50 && 'error'}`)}>
              <span>{countValueMusic}</span>/<span>50</span>
            </span>
          </div>
          <div className={cx('input-body')}>
            <div
              ref={textRefMusic}
              suppressContentEditableWarning
              spellCheck
              onInput={handelChangeValueMusic}
              contentEditable
              id="input"
            ></div>
          </div>
        </div>
      </div>
      <div className={cx('cover-container')}>
        <p className={cx('title')}>Cover</p>
        <section className={cx('wrapper-cover')}>
          <div className={cx('image-container')}>
            {fileVideo !== null && (
              <input type="range" min={0} max={maxLength} step={1} onInput={handelSeekVideo}></input>
            )}
            <div
              className={cx('image-drag')}
              style={{ transform: `translate3d(${valueTransForm * (695 / (maxLength + 2))}px, 1px, 0px)` }}
            >
              <div className={cx('video-snapshort')}>
                {fileVideo !== null && <video ref={videoRef} src={fileVideo?.preview}></video>}
              </div>
            </div>
            {fileVideo !== null && generateThumbnail()}
          </div>
        </section>
      </div>
      <div className={cx('allow-video-container')}>
        <p className={cx('title')}>Who can watch this video</p>
        <div className={cx('select-container')} ref={optionRef}>
          <div className={cx('select-option')} onClick={() => setShowOption(!showOption)}>
            <span>{myOption}</span>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={cx('icon-arrow')}
              style={{ transform: `${showOption ? 'rotate(180deg)' : 'rotate(0deg)'}` }}
            ></FontAwesomeIcon>
          </div>
          <div className={cx('choose-option')} style={{ display: `${showOption ? 'block' : 'none'}` }}>
            {OPTION_ALLOW_VIDEO.map((option) => (
              <div
                key={option}
                className={cx('item', `${option === myOption && 'active-item'}`)}
                onClick={() => handelChooseOption(option)}
              >
                <span className={cx('content')}>{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx('allow-user-container')}>
        <p className={cx('title')}>Allow users to:</p>
        <div className={cx('group-checkboxes')}>
          {VALUE_CHECKBOX.map((item, i) => (
            <div key={i} className={cx('check-wrapper')}>
              <input
                type="checkbox"
                id={'check' + i}
                hidden
                onChange={() => handelCheck(i)}
                checked={checked.includes(i)}
              />
              <label htmlFor={'check' + i}>
                <div className={cx('checkBox-icon')}>
                  <FontAwesomeIcon icon={faCheck} className={cx(checked.includes(i) && 'checked')}></FontAwesomeIcon>
                  {item}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('copy-right-check-container')}>
        <div className={cx('switch-block')}>
          <p className={cx('title')}>Run a copyright check</p>
          <div className={cx('switch-container')}>
            <input type="checkbox" onChange={handelSwitch} role="switch" checked={switchCopyRight} />
            <div className={cx('dot', `${switchCopyRight && 'checked'}`)}></div>
          </div>
        </div>
        {switchCopyRight &&
          (fileVideo !== null ? (
            <div className={cx('result-check')}>
              {showLoadingCheck ? (
                <div className={cx('lds-ring')}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <img src={imgaes.tick} alt=""></img>
              )}
              {showLoadingCheck ? (
                <span>Checking in progress. This will take about 1 minute</span>
              ) : (
                <span>No issues detected.</span>
              )}
            </div>
          ) : (
            <div className={cx('result-check')}>
              <Warning></Warning>
              <span>Copyright check will not begin until your video is uploaded.</span>
            </div>
          ))}
      </div>
      <div className={cx('btn-container')}>
        <Button nonBG large onClick={() => setOpenModal(true)}>
          Discard
        </Button>
        <Button
          primary={fileVideo !== null}
          nonBG={fileVideo === null}
          disable={fileVideo === null}
          large
          onClick={handelPostVideo}
          className={cx(showLoadingPost && 'postingVideo')}
        >
          {showLoadingPost ? (
            <div className={cx('lds-ring', `${showLoadingPost && 'postVideo'}`)}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            'Post'
          )}
        </Button>
      </div>
      {openModal && (
        <ConfirmModal
          openModal={openModal}
          closeModal={setOpenModal}
          confirmModal={setConfirm}
          form_twice
          contentBody={'Discard this post?'}
          contentBtnLeft={'Continue editing'}
          contentBtnRight={'Discard'}
          contentDes={'The video and all edits will be discarded.'}
        ></ConfirmModal>
      )}
      {showResultPost && (
        <ConfirmModal
          openModal={showResultPost}
          closeModal={handelHideShowResult}
          confirmModal={setConfirm}
          form_first
          contentBody={'Your video has been uploaded to TikTok!'}
          contentBtnRight={'View profile'}
          contentBtnLeft={'Upload another video'}
          contentDes={'The video and all edits will be discarded.'}
          isTagLink
          toLink={`/@${nameUer}`}
        ></ConfirmModal>
      )}
    </div>
  );
}

export default VideoSetupRight;
