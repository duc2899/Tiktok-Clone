import classNames from 'classnames/bind';
import sytles from './Video.module.scss';
import HoverVideoPlayer from 'react-hover-video-player';
import { Play } from '~/component/Icons';
import { useContext, useEffect, useState } from 'react';
import VideoDetail from '../../VideoDetail';
const cx = classNames.bind(sytles);

function Videos({ data }) {
  const [openDetailVideo, setOpenDetailVideo] = useState(false);
  useEffect(() => {
    if (!openDetailVideo) {
      setOpenDetailVideo(false);
      document.body.classList.remove('active');
      window.history.replaceState(
        `${window.location.href + `/videoDetail/${data.id}`}`,
        'Sample Title',
        `${window.location.origin + `/@${data.user.nickname}`}`,
      );
    } else {
      window.history.replaceState(
        `${window.location.href}`,
        'Sample Title',
        `${window.location.href + `/videoDetail/${data.id}`}`,
      );

      document.body.classList.add('active');
      setOpenDetailVideo(true);
    }
  }, [openDetailVideo]);
  return (
    <div className={cx('wrapper')}>
      <HoverVideoPlayer
        onClick={() => setOpenDetailVideo(true)}
        className={cx('video')}
        videoSrc={data.file_url}
        autoFocus
        pausedOverlay={
          <img
            src={data.thumb_url}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        }
      ></HoverVideoPlayer>

      <div className={cx('views')}>
        <Play />
        <span className={cx('count')}>{data.views_count}</span>
      </div>
      <a title={data.description} href={data.file_url} className={cx('des')}>
        <div tabIndex="-1" className={cx('des-div')}>
          <span>{data.description}</span>
        </div>
      </a>
      {openDetailVideo && <VideoDetail video={data} onExitDetail={setOpenDetailVideo} isScroll={false}></VideoDetail>}
    </div>
  );
}

export default Videos;
