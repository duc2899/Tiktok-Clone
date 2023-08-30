import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import sytles from './Menu.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(sytles);
function Header({ title, onBack }) {
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx('title-header')}>{title}</h4>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
export default Header;
