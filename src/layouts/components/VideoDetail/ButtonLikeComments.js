import { useEffect, useState, useContext } from 'react';
import { IconHearNoBG } from '~/component/Icons';
import * as actionsCommentService from '~/component/Services/actionsCommentService';
import classNames from 'classnames/bind';
import sytles from './VideoDetail.module.scss';
import { StatusAcc } from '~/component/StatusAccount';
import Modal from '~/layouts/Modal';

const cx = classNames.bind(sytles);

function ButtonLikeComment({ item, className }) {
  // const [item, setItem] = useState(dataComment);
  useEffect(() => {
    setIsTym(item.is_liked);
    setCountTym(item.likes_count);
  }, [item.is_liked, item.likes_count]);
  const [isTym, setIsTym] = useState(item.is_liked);
  const [countTym, setCountTym] = useState(item.likes_count);
  const [isOpen, setIsOpen] = useState(false);
  const providerStatusAcc = useContext(StatusAcc);

  function actionVideo(action) {
    const fetchApi = async () => {
      try {
        const result = await actionsCommentService.actionComment(
          item.id,
          JSON.parse(localStorage.getItem('token')),
          action,
        );
        setIsTym(result.is_liked);
        setCountTym(result.likes_count);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }
  const handleTym = () => {
    if (providerStatusAcc.isLogin) {
      if (isTym === false) {
        actionVideo('like');
      } else {
        actionVideo('unlike');
      }
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <button key={item.id} className={cx('btn-like', `${className}`)} onClick={() => handleTym()}>
        <span className={cx(`${isTym && 'heart'}`)}>
          <IconHearNoBG></IconHearNoBG>
        </span>
        <strong className={cx('likes-count')}>{countTym}</strong>
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </>
  );
}

export default ButtonLikeComment;
