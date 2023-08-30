import { useEffect, useState, useContext } from 'react';
import { IconHeart } from '~/component/Icons';
import * as actionsVideoService from '~/component/Services/actionsVideoService';
import classNames from 'classnames/bind';
import sytle from './ButtonLike.module.scss';
import { StatusAcc } from '~/component/StatusAccount';
import Modal from '~/layouts/Modal';
import { DataVideoNew } from '~/component/Provider/DataVideoLike';

const cx = classNames.bind(sytle);

function ButtonLike({ item, className, Icon = <IconHeart /> }) {
  const [isTym, setIsTym] = useState(false);
  const [countTym, setCountTym] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const providerStatusAcc = useContext(StatusAcc);
  const providerVideoLike = useContext(DataVideoNew);
  useEffect(() => {
    setIsTym(item.is_liked);
  }, [item.is_liked]);
  useEffect(() => {
    setCountTym(item.likes_count);
  }, [item.likes_count]);

  function actionVideo(action) {
    const fetchApi = async () => {
      try {
        const result = await actionsVideoService.actionVideos(
          item.id,
          JSON.parse(localStorage.getItem('token')),
          action,
        );
        providerVideoLike.setVideo(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }
  const handleTym = () => {
    if (providerStatusAcc.isLogin) {
      setIsTym(!isTym);
      if (isTym === false) {
        setCountTym(countTym + 1);
        actionVideo('like');
      } else {
        setCountTym(countTym - 1);
        actionVideo('unlike');
      }
    } else {
      setIsOpen(true);
    }
  };
  return (
    <div className={cx(`${className === undefined ? 'like-homePage' : className}`)}>
      <button className={cx('item-btn')} onClick={() => handleTym()}>
        <div className={cx('like-button')}>
          <div className={cx('heart-bg')}>
            <div className={cx('heart-icon', `${isTym && 'liked'}`)}></div>
          </div>
        </div>
      </button>
      <strong className={cx('likes-count')}>{countTym}</strong>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
}

export default ButtonLike;
