import sytles from './Toast.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(sytles);

function Toast({ text, visible }) {
  return (
    <div className={cx('wrapper')} style={{ top: visible ? '17px' : '-48px' }}>
      <div className={cx('message')}>{text}</div>
    </div>
  );
}

export default Toast;
