import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonScrollTop.module.scss';
import { IconScrollToTop } from '~/component/Icons/';

const cx = classNames.bind(styles);

function ButtonScrollTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 10) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <button
      className={cx('btn-scroll')}
      style={{ transform: visible ? 'translateY(-8px)' : 'translateY(40px)' }}
      onClick={scrollToTop}
    >
      <IconScrollToTop />
    </button>
  );
}

export default ButtonScrollTop;
