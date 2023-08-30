import sytle from './LoadingOverlay.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(sytle);

function LoadingOverlay({ title }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('lds-heart')}>
        <div></div>
      </div>
      <span className={cx('loader')}>{title}</span>
    </div>
  );
}

export default LoadingOverlay;
