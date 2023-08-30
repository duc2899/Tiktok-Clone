import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/component/Config';
import { Live, Follwing, ForYou, LiveActive, FollwingActive, ForYouActive } from '~/component/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountSideBar from '~/component/AccountSideBar/AccountSideBar';
import * as suggestedService from '~/component/Services/suggestedService';
import * as followingAccount from '~/component/Services/followingAccount';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { StatusAcc } from '~/component/StatusAccount';
import Button from '~/component/Button/Button';
import Modal from '~/layouts/Modal';

const cx = classNames.bind(styles);
function Siderbar() {
  const getIsLogin = useContext(StatusAcc);
  const isLogin = getIsLogin.isLogin;

  const [data, setData] = useState([]);
  const [dataFollowing, setDataFollowing] = useState([]);
  const [checkMaxDataFollowing, setCheckMaxDataFollowing] = useState([]);
  const [seeMoreSuggest, setSeeMoreSuggest] = useState(5);
  const [seeMoreFollowing, setSeeMoreFollowing] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const MENU_LINK_1 = ['About', 'Newsroom', 'Contact', 'Careers'];

  const MENU_LINK_2 = ['TikTok for Good', 'Advertise', 'Developers', 'Transparency', 'TikTok Rewards', 'TikTok Embeds'];
  const MENU_LINK_3 = ['Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines'];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await suggestedService.suggestedAcc(1, seeMoreSuggest);
      setData(result);
    };
    fetchApi();
  }, [seeMoreSuggest]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await followingAccount.followingAccount(seeMoreFollowing);
        setCheckMaxDataFollowing(result);
        setDataFollowing((prev) => [...prev, ...result]);
      } catch (err) {
        console.log(err);
      }
    };
    isLogin && fetchApi();
  }, [seeMoreFollowing, isLogin]);
  const handelSeeLessFollowing = () => {
    setDataFollowing([]);
    setSeeMoreFollowing(1);
  };

  const handelGetYear = () => {
    var currentTime = new Date();
    let year = currentTime.getFullYear();
    return year;
  };
  return (
    <div className={cx('siderbar')}>
      <aside className={cx('wrapper')}>
        <div className={cx('inner')}>
          <Menu>
            <MenuItem title="For You" to={config.routes.home} icon={<ForYou />} iconActive={<ForYouActive />} />
            <MenuItem
              title="Following"
              to={config.routes.following}
              icon={<Follwing />}
              iconActive={<FollwingActive />}
            />
            <MenuItem title="LIVE" to={config.routes.live} icon={<Live />} iconActive={<LiveActive />} />
          </Menu>
          <AccountSideBar label="Suggested accounts" data={data} />
          {seeMoreSuggest === 5 ? (
            <p className={cx('see')} onClick={() => setSeeMoreSuggest(10)}>
              See more
            </p>
          ) : (
            <p className={cx('see')} onClick={() => setSeeMoreSuggest(5)}>
              See less
            </p>
          )}
          {isLogin ? (
            <>
              <AccountSideBar label={'Following accounts'} data={dataFollowing}></AccountSideBar>
              <>
                {checkMaxDataFollowing.length !== 0 ? (
                  <p className={cx('see')} onClick={() => setSeeMoreFollowing(seeMoreFollowing + 1)}>
                    See more
                  </p>
                ) : (
                  <p className={cx('see')} onClick={handelSeeLessFollowing}>
                    See less
                  </p>
                )}
              </>
            </>
          ) : (
            <div className={cx('block-offline')}>
              <p className={cx('content')}>Log in to follow creators, like videos, and view comments.</p>
              <Button large long outline onClick={() => setIsOpen(true)}>
                Log in
              </Button>
            </div>
          )}

          <div className={cx('footer-sidebar')}>
            <div className={cx('btn-createEff')}>
              <a href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v2&utm_source=tiktok_webapp_main">
                <img src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/045b2fc7c278b9a30dd0.png"></img>
                <div className={cx('content-btn')}>
                  <FontAwesomeIcon icon={faDungeon}></FontAwesomeIcon>
                  <h4>Create effects</h4>
                </div>
              </a>
            </div>
            <div className={cx('link-container')}>
              {MENU_LINK_1.map((item, i) => (
                <a href="#" key={i}>
                  {item}
                </a>
              ))}
            </div>
            <div className={cx('link-container')}>
              {MENU_LINK_2.map((item, i) => (
                <a href="#" key={i}>
                  {item}
                </a>
              ))}
            </div>
            <div className={cx('link-container')}>
              {MENU_LINK_3.map((item, i) => (
                <a href="#" key={i}>
                  {item}
                </a>
              ))}
            </div>
            <div className={cx('create-year')}>{'© ' + handelGetYear() + ' TikTok'}</div>
          </div>
        </div>
      </aside>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
}

export default Siderbar;
