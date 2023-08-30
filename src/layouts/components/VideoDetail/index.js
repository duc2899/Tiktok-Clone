import classNames from 'classnames/bind';
import sytles from './VideoDetail.module.scss';
import { createPortal } from 'react-dom';
import Image from '~/component/Images/Images';
import { Link, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import AccountItem from '~/component/AccountSideBar/AccountItem';
import { useEffect, useState, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IconMusic, IconShare, IconMessage, IconEmoji } from '~/component/Icons';
import { SHARE_MENU_1 } from '~/component/StoreMenu';
import { SHARE_MENU_2 } from '~/component/StoreMenu';
import Menu from '~/layouts/Popper/Menu/Menu';
import ClipboardCopy from './ClipboardCopy ';
import * as getCommentsService from '~/component/Services/getCommentsService';
import CommentBlock from './CommentsBlock';

import MenuEmoji from './MenuEmoji';

import * as postCommentService from '~/component/Services/postCommentService';
import ButtonLike from '../HomeForYou/ControlButton/ButtonLike';
import ButtonFollow from '../HomeForYou/ControlButton/ButtonFollow';
import { StatusAcc } from '~/component/StatusAccount';
import Modal from '~/layouts/Modal';
import BlockVideo from './BlockVideo';
import Toast from '~/component/Toast';
import { DataVideosArray } from '~/component/Provider/StoreVideo';

const cx = classNames.bind(sytles);

function VideoDetail({ videoId, onExitDetail, isScroll = true }) {
  const contextVideos = useContext(DataVideosArray);

  // console.log(videos);
  const [videoID, setVideoID] = useState([videoId.id]);
  const providerStatusAcc = useContext(StatusAcc);

  const [dataComment, setDataComment] = useState([]);
  const [countComments, setCountComments] = useState();
  const [inputVal, setInputVal] = useState('');
  const [countText, setCountText] = useState(0);
  const [dataEmoji, setDataEmoji] = useState();
  const [post, setPost] = useState(false);
  const textareaRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [contentToast, setContentToast] = useState('');
  const [positionVideo, setPositionVideo] = useState(contextVideos.arrayID.indexOf(videoId.id));
  const [dataVideo, setDataVideo] = useState(videoId);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isScroll) {
      const videos = document.querySelectorAll('.videoHome');
      videos[positionVideo].scrollIntoView();
    }
    setDataVideo(contextVideos.video[positionVideo]);
    setVideoID(contextVideos.arrayID[positionVideo]);
  }, [positionVideo, isScroll]);

  if (showToast) {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  const handleInputChange = (e) => {
    if (e.target.value.length > 150) {
      return;
    }
    setInputVal(e.target.value);
    setCountText(e.target.value.length);
  };
  useEffect(() => {
    if (dataEmoji !== undefined && countText < 149) {
      setInputVal((prev) => prev + dataEmoji);
      setCountText((prev) => prev + dataEmoji.length);
    }
  }, [dataEmoji]);
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const taHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = taHeight + 'px';
    }
  }, [inputVal]);

  const callbackFunction = (childData) => {
    setTimeout(() => setCountComments(childData), 0);
  };
  const getDataEmoji = (childData) => {
    setTimeout(() => setDataEmoji(childData), 0);
  };

  const handelTextCreated = () => {
    const arrayText = dataVideo.created_at.split(' ');
    return arrayText[0];
  };
  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getCommentsService.getComments(1, videoID);
        setDataComment(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [videoID]);

  const handelKeyDownPost = (e, countText) => {
    if (e.keyCode === 13 && countText > 0) {
      setPost(true);
    }
  };

  const handelNewLine = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) e.preventDefault();
  };

  // add toast
  const toastView = (content) =>
    createPortal(<Toast text={content} visible={showToast}></Toast>, document.getElementById('protal'));

  if (post) {
    if (inputVal.startsWith(' ')) {
      setShowToast(true);
      setContentToast("Couldn't post comment. Try again");
    }
    const fetchApi = async () => {
      try {
        const result = await postCommentService.postComment(
          dataVideo.id,
          JSON.parse(localStorage.getItem('token')),
          inputVal,
        );
        if (Object.getOwnPropertyNames(result).length !== 0) {
          setDataComment((prev) => [...prev, result]);
          setShowToast(true);
          setContentToast('Comment posted');
        } else {
          setShowToast(true);
          setContentToast("Couldn't post comment. Try again");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
    setInputVal('');
    setPost(false);
    setCountText(0);
    setDataEmoji(undefined);
  }
  useEffect(() => {
    window.history.replaceState(
      `${window.location.origin}`,
      'Sample Title',
      `${window.location.origin + `/videoDetail/${videoID}`}`,
    );
  }, [videoID]);
  return createPortal(
    <div className={cx('wrapper')}>
      <div style={{ position: 'relative', flex: '1' }}>
        <BlockVideo dataItem={dataVideo} onExitDetail={onExitDetail}></BlockVideo>
        {positionVideo !== 0 && (
          <button className={cx('btn', 'btn-prevVideo')} onClick={() => setPositionVideo(positionVideo - 1)}>
            <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
          </button>
        )}
        {positionVideo !== contextVideos.arrayID.length - 1 && (
          <button className={cx('btn', 'btn-nextVideo')} onClick={() => setPositionVideo(positionVideo + 1)}>
            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
          </button>
        )}
      </div>
      <div className={cx('content-container')}>
        <header>
          <div className={cx('infor-acc')}>
            <div>
              <AccountItem data={dataVideo.user}>
                <Link to={`/@${dataVideo.user.nickname}`}>
                  <Image src={dataVideo.user.avatar}></Image>

                  <div className={cx('infor')}>
                    <p className={cx('user-name')}>
                      {handelNameNull(dataVideo.user.first_name, dataVideo.user.last_name)}
                      {dataVideo.user.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('icon-check')} />}
                    </p>
                    <div className={cx('nickname')}>
                      <span>{dataVideo.user.nickname}</span> · <span>{handelTextCreated()}</span>
                    </div>
                  </div>
                </Link>
              </AccountItem>
            </div>
            <ButtonFollow dataUser={dataVideo.user}></ButtonFollow>
          </div>
          <div className={cx('des')}>
            <p className={cx('text-des')}>{dataVideo.description}</p>
            <p className={cx('music')}>
              <IconMusic></IconMusic>
              {dataVideo.music === '' ? `original sound  - ${dataVideo.user.nickname}` : dataVideo.music}
            </p>
          </div>
          <div className={cx('interactive')}>
            <div className={cx('block-1')}>
              <div className={cx('count-list')}>
                <ButtonLike key={dataVideo.id} item={dataVideo} className={cx('icon-likeDetail')}></ButtonLike>
                <div className={cx('messagees')}>
                  <span>
                    <IconMessage />
                  </span>
                  <strong>{countComments}</strong>
                </div>
              </div>
              <div className={cx('share-list')}>
                <div className={cx('menu-show')}>
                  {SHARE_MENU_1.map((item, i) => (
                    <Tippy placement="top" content={item.title} zIndex={999999999} key={i}>
                      <a href="helo">{item.icon}</a>
                    </Tippy>
                  ))}
                </div>
                <Menu items={SHARE_MENU_2}>
                  <div className={cx('menu-hidden')}>
                    <IconShare />
                  </div>
                </Menu>
              </div>
            </div>
            <ClipboardCopy copyText={window.location.href}></ClipboardCopy>
          </div>
        </header>
        <div className={cx('block-comments')}>
          {
            <CommentBlock
              dataComments={dataComment}
              countComments={callbackFunction}
              idCreator={dataVideo.user.id}
              editComment={setDataComment}
            ></CommentBlock>
          }
        </div>
        <footer className={cx('block-inputComments')}>
          {providerStatusAcc.isLogin ? (
            <div className={cx('comment-wrapper')}>
              <div className={cx('input-container')}>
                <textarea
                  id="test"
                  value={countText <= 150 && inputVal}
                  ref={textareaRef}
                  onChange={handleInputChange}
                  rows={1}
                  spellCheck="false"
                  placeholder="Add comment..."
                  onKeyUp={(e) => handelKeyDownPost(e, countText)}
                  onKeyDown={(e) => handelNewLine(e)}
                ></textarea>
                {countText > 50 && (
                  <p className={cx('count-text', `${countText >= 150 ? 'limit' : ''}`)}>{countText + '/' + 150}</p>
                )}
                <MenuEmoji dataEmoji={getDataEmoji}>
                  <Tippy content="Click to add emojis" placement="top" zIndex={999999999999999} offset={[0, 25]}>
                    <div style={{ marginLeft: 372 }}>
                      <IconEmoji className={cx('icon-emoji')}></IconEmoji>
                    </div>
                  </Tippy>
                </MenuEmoji>
              </div>
              <button
                className={cx('submit-comment', `${countText > 0 ? 'active-btn' : ''}`)}
                onClick={() => countText > 0 && setPost(true)}
              >
                Post
              </button>
            </div>
          ) : (
            <div className={cx('comment-wrapper')} onClick={() => setIsOpen(true)}>
              <p className={cx('notifi-comment')}>Login to comment</p>
            </div>
          )}
        </footer>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
      {toastView(contentToast)}
    </div>,

    document.getElementById('protal'),
  );
}

export default VideoDetail;
