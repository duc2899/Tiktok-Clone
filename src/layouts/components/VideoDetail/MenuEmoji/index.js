import Tippy from '@tippyjs/react/headless';
import sytle from './MenuEmoji.module.scss';
import classNames from 'classnames/bind';
import { Wrapper } from '~/layouts/Popper';
import { MENU_BODY, MENU_EMOJI, MENU_REPRESENT } from '~/component/StoreMenu';
import { useState } from 'react';

const cx = classNames.bind(sytle);

function MenuEmoji({ children, dataEmoji }) {
  const [id, setID] = useState(0);
  const MENU_COMBO = [MENU_EMOJI, MENU_BODY];
  const hanđelDataEmoji = (e) => {
    dataEmoji(e.target.innerHTML);
  };
  const renderResult = (attrs) => (
    <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
      <Wrapper>
        <div className={cx('table-emoji')}>
          {MENU_COMBO[id].map((item, i) => (
            <div key={i} className={cx('btn-emoji')} id="button" onClick={(e) => hanđelDataEmoji(e)}>
              {item}
            </div>
          ))}
        </div>
        <div className={cx('list-emoji')}>
          {MENU_REPRESENT.map((item) => (
            <span key={item.id} onClick={() => setID(item.id)}>
              {item.icon}
            </span>
          ))}
        </div>
      </Wrapper>
    </div>
  );
  return (
    <Tippy
      zIndex={9999999999999}
      appendTo={document.body}
      delay={[0, 500]}
      trigger="click"
      interactive
      placement={'top'}
      offset={[0, 90]}
      render={renderResult}
    >
      {children}
    </Tippy>
  );
}

export default MenuEmoji;
