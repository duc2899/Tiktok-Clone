import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import sytles from './Menu.module.scss';

function Menu({ children }) {
  return <nav>{children}</nav>;
}
Menu.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Menu;
