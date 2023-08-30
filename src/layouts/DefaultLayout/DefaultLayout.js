import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header/Header';
import Siderbar from '~/layouts/components/Siderbar';
import styles from './DefaultLayout.module.scss';
import ButtonScrollTop from '~/component/ButtonScrollTop';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')} onScroll={(e) => console.log(e.target.value)}>
      <Header />
      <div className={cx('container')}>
        <Siderbar />
        <div className={cx('content')}>{children}</div>
      </div>

      <ButtonScrollTop />
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
