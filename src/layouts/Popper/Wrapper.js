import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import sytles from './Wrapper.module.scss';

const cx = classNames.bind(sytles);
function Wrapper({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Wrapper;
