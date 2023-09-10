import classNames from 'classnames/bind';
import style from './SkeletionProfile.module.scss';
const cx = classNames.bind(style);
function SkeletonProfile() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('block-video')}></div>
      <div className={cx('block-video')}></div>
      <div className={cx('block-video')}></div>
      <div className={cx('block-video')}></div>
      <div className={cx('block-video')}></div>
      <div className={cx('block-video')}></div>
    </div>
  );
}
export default SkeletonProfile;
