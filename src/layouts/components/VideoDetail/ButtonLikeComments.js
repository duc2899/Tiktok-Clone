import { useEffect, useState, useContext } from 'react';
import { IconHearNoBG } from '~/component/Icons';
import * as actionsCommentService from '~/component/Services/actionsCommentService';
import classNames from 'classnames/bind';
import sytles from './VideoDetail.module.scss';
import { StatusAcc } from '~/component/StatusAccount';
import Modal from '~/layouts/Modal';

const cx = classNames.bind(sytles);

function ButtonLikeComment({ item, className }) {
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
    <>
      <button className={cx('btn-like', `${className}`)} onClick={() => handleTym()}>
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
