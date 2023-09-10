import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import { Wrapper as WrapperPopper } from '~/layouts/Popper';
import Items from './MenuItems';
import sytles from './Menu.module.scss';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(sytles);
const defaultFn = () => {};
function Menu({
  spaceIcon = false,
  children,
  items = [],
  data,
  onChange = defaultFn,
  hideOnClick = false,
  expand = '',
  customPlaceMent = 'bottom-end',
  customOffset = [12, 8],
}) {
  const [history, setHistory] = useState([{ data: [] }]);

  const currentHistory = history[history.length - 1];
  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);
  const [menu, setMenu] = useState(expand);
  const renderItems = () => {
    return currentHistory.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <Items
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item, data);
            }
          }}
        />
      );
    });
  };

  // const providerLogin = useContext(StatusAcc);

  const handelBackPrev = () => setHistory((prev) => prev.slice(0, prev.length - 1));

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <WrapperPopper className={expand === 'active' && menu && cx('menu-more-height')}>
        {history.length > 1 && <Header title={currentHistory.title} onBack={handelBackPrev} />}
        <div className={cx('menu-body', expand === 'active' && menu && 'menu-more', spaceIcon && 'space-icon')}>
          {renderItems()}
        </div>
        {expand === 'active' && menu && (
          <div className={cx('expand')} onClick={() => setMenu(false)}>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        )}
      </WrapperPopper>
    </div>
  );
  // handel back first menu when hide tippy
  const handelBackFirstMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
    setMenu(true);
  };

  return (
    <Tippy
      zIndex={999999999}
      appendTo={document.body}
      interactive
      hideOnClick={hideOnClick}
      offset={customOffset}
      delay={[0, 500]}
      placement={customPlaceMent}
      render={renderResult}
      onHide={handelBackFirstMenu}
      arrow={true}
    >
      {children}
    </Tippy>
  );
}
Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool,
  expand: PropTypes.string,
  customPlaceMent: PropTypes.string,
};
export default Menu;
