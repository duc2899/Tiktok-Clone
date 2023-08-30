import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import sytles from './accountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/component/Images/Images';

const cx = classNames.bind(sytles);

function AccountItem({ data, props }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')} onClick={() => props(false)}>
      <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
      <div className={cx('infor')}>
        <h4 className={cx('name')}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('username')}>{data.nickname}</span>
      </div>
    </Link>
  );
}
AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
