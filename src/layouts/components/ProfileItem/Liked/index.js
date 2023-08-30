import classNames from 'classnames/bind';
import sytles from './Liked.module.scss';
import { LockedLarge } from '~/component/Icons';
const cx = classNames.bind(sytles);

function Liked({ data }) {
  return (
    <div className={cx('wrapper')}>
      <LockedLarge className={cx('icon')} />
      <p className={cx('title')}>This user's liked videos are private</p>
      <p>Videos liked by {data} are currently hidden</p>
    </div>
  );
}

export default Liked;
