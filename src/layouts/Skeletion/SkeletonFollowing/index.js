import classNames from 'classnames/bind';
import style from './SkeletonFollwing.module.scss';
const cx = classNames.bind(style);
function SkeletonFollowing() {
  return (
    <div className={cx('wrapper', 'animate-pulse')}>
      <div className={cx('avatar')}></div>
      <div className={cx('block-video')}>
        <div className={cx('infor')}>
          <div className={cx('name-user')}></div>
          <div className={cx('name-video')}></div>
          <div className={cx('name-linkMusic')}></div>
        </div>
        <div className={cx('video')}></div>
      </div>
    </div>
  );
}
export default SkeletonFollowing;
