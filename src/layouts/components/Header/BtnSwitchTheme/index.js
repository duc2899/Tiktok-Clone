import classNames from 'classnames/bind';
import style from './BtnSwtichTheme.moduel.scss';
import { useState, useContext } from 'react';
import { ThemeContext } from '~/component/Provider/Theme';

const cx = classNames.bind(style);
function BtnSwitchTheme() {
  const ThemeProvider = useContext(ThemeContext);

  const [switchTheme, setSwitchTheme] = useState(false);
  const handelSwitch = () => {
    setSwitchTheme(!switchTheme);
    ThemeProvider.toggleTheme();
  };
  return (
    <div className={cx('switch-container')}>
      <input type="checkbox" onChange={handelSwitch} role="switch" checked={switchTheme} />
      <div className={cx('dot', `${switchTheme && 'checked'}`)}></div>
    </div>
  );
}

export default BtnSwitchTheme;
