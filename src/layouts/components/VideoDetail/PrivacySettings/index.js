import classNames from 'classnames/bind';
import sytle from './Privacy.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as updatePrivacyVideo from '~/component/Services/updatePrivacySetting';

const cx = classNames.bind(sytle);

function PrivacySettings({ data, setOpenSetting, setShowToast, setDataVideo }) {
  const optionRef = useRef(null);
  const blockPrivacyRef = useRef(null);
  const VALUE_CHECKBOX = ['comment', 'duet', 'stitch'];
  const OPTION_ALLOW_VIDEO = ['public', 'friends', 'private'];
  const DES_OPTION_ALLOW = ['Allow comments', 'Followers that you follow back', 'Visible to me only'];
  const [myOption, setMyOption] = useState(data.viewable);
  const [showOption, setShowOption] = useState(false);
  const [checked, setChecked] = useState(data.allows);

  if (showOption) {
    document.body.addEventListener('click', (e) => {
      if (!optionRef.current?.contains(e.target)) {
        setShowOption(false);
      }
    });
  }

  const handelChooseOption = (option) => {
    setMyOption(option);
    setShowOption(false);
  };
  const handelSwitch = (i) => {
    setChecked((prev) => {
      const isChecked = checked.includes(i);
      if (isChecked) {
        return checked.filter((item) => item !== i);
      } else {
        return [...prev, i];
      }
    });
  };

  const handelUpcaseFirst = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const handelDone = () => {
    let formData = new FormData();
    formData.append('viewable', myOption);
    checked.forEach((e) => {
      formData.append('allows[]', e);
    });
    const fetchApi = async () => {
      try {
        await updatePrivacyVideo.updatePrivacyVideo(data.id, formData, JSON.parse(localStorage.getItem('token')));
      } catch (err) {
        console.log(err);
      }
    };

    const sameArray =
      data.allows.length === checked.length && checked.every((value, index) => value === data.allows[index]);

    if (myOption !== data.viewable || sameArray === false) {
      fetchApi();
      setShowToast(true);
      data.viewable = myOption;
      data.allows = checked;
      setDataVideo(data);
    }
    setOpenSetting(false);
  };
  return (
    <div className={cx('bg-overlay')}>
      <div className={cx('main-content')} ref={blockPrivacyRef}>
        <div className={cx('title')}>Privacy settings</div>
        <div className={cx('watchVideo-container')}>
          <div className={cx('des')}>Who can watch this video</div>
          <div className={cx('select-container')} ref={optionRef}>
            <div className={cx('select-option')} onClick={() => setShowOption(!showOption)}>
              <span>{handelUpcaseFirst(myOption)}</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={cx('icon-arrow')}
                style={{ transform: `${showOption ? 'rotate(180deg)' : 'rotate(0deg)'}` }}
              ></FontAwesomeIcon>
            </div>
            <div className={cx('choose-option')} style={{ display: `${showOption ? 'block' : 'none'}` }}>
              {OPTION_ALLOW_VIDEO.map((option, i) => (
                <div
                  key={option}
                  className={cx('item', `${option === myOption && 'active-item'}`)}
                  onClick={() => handelChooseOption(option)}
                >
                  <span className={cx('content')}>{handelUpcaseFirst(option)}</span>
                  <p>{DES_OPTION_ALLOW[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx('allow-container')}>
          <div className={cx('switch-block')}>
            {VALUE_CHECKBOX.map((item, i) => (
              <div key={i} className={cx('item')}>
                <p className={cx('title-allow')}>Allow {item}</p>
                <div className={cx('switch-container')}>
                  <div className={cx('check-wrapper')}>
                    <input
                      type="checkbox"
                      onChange={() => handelSwitch(item)}
                      role="switch"
                      checked={checked.includes(item)}
                    />
                    <div className={cx('dot', `${checked.includes(item) && 'checked'}`)}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className={cx('description')}>Duet and Stitch aren’t available on videos from private accounts</p>
        <div className={cx('btn-done')} onClick={handelDone}>
          Done
        </div>
      </div>
    </div>
  );
}
export default PrivacySettings;
