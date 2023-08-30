import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import sytles from './Menu.module.scss';

const cx = classNames.bind(sytles);
function MenuItem({ title, to, icon, iconActive }) {
  return (
    <NavLink className={(data) => cx('menu-item', { active: data.isActive })} to={to}>
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('icon-active')}>{iconActive}</span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  iconActive: PropTypes.node,
};
export default MenuItem;
