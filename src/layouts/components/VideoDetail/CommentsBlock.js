import classNames from 'classnames/bind';
import sytles from './VideoDetail.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/component/Images/Images';
import { useEffect, useState, useContext } from 'react';
import { ThreeDots, IconHearNoBG, IconDelete } from '~/component/Icons';
import { createPortal } from 'react-dom';
import AccountItem from '~/component/AccountSideBar/AccountItem';
import Menu from '~/layouts/Popper/Menu/Menu';
import { MENU_COMMENT } from '~/component/StoreMenu';
import { StatusAcc } from '~/component/StatusAccount';
import ButtonLikeComment from './ButtonLikeComments';
import * as deleteCommentService from '~/component/Services/deleteCommentService';
import ConfirmModal from '~/component/ConfirmModal';
import Toast from '~/component/Toast';

const cx = classNames.bind(sytles);

function CommentBlock({ dataComments, countComments, idCreator, editComment }) {
  const [data, setData] = useState([]);
  // console.log(data);
  const providerDataSelf = useContext(StatusAcc);
  const [openModal, setOpenModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [idComment, setIdComment] = useState(0);
  const [showToast, setShowToast] = useState(false);
  if (showToast) {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  countComments(data.length);

  useEffect(() => {
    setData(dataComments);
  }, [dataComments]);

  const handelTextCreated = (item) => {
    const arrayText = item.created_at.split(' ');
    return arrayText[0];
  };
  const handelNameNull = (first_name, last_name) => {
    if (first_name === '' && last_name === '') {
      return 'Unknown name';
    } else {
      return first_name + last_name;
    }
  };

  const MENU_COMMENT_SELF = [
    {
      icon: <IconDelete />,
      title: 'Delete',
    },
  ];
  const handelDeleteComment = (menuItem, id) => {
    if (menuItem.title == 'Delete') {
      setOpenModal(true);
      setIdComment(id);
    }
  };
  useEffect(() => {
    if (confirm && idComment !== 0) {
      const fetchApi = async () => {
        try {
          await deleteCommentService.deleteComment(idComment, JSON.parse(localStorage.getItem('token')));
          editComment(dataComments.filter((item) => item.id !== idComment));
          setData(data.filter((item) => item.id !== idComment));
          setShowToast(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchApi();
      setOpenModal(false);
      setConfirm(false);
    }
  }, [confirm, idComment]);

  const toastView = () =>
    createPortal(<Toast text="Deleted" visible={showToast}></Toast>, document.getElementById('protal'));
  return (
    <div className={cx('block')}>
      {data.length > 0 ? (
        data.map((item, i) => (
          <div className={cx('comment-item')} key={i}>
            <AccountItem data={item.user}>
              <Link to={`/@${item.user.nickname}`} className={cx('avatar')} style={{ height: 'fit-content' }}>
                <Image src={item.user.avatar}></Image>
              </Link>
            </AccountItem>
            <div className={cx('comment-body')}>
              <AccountItem data={item.user}>
                <div style={{ display: 'flex' }}>
                  <Link to={`/@${item.user.nickname}`} className={cx('user-name')}>
                    <strong>{handelNameNull(item.user.first_name, item.user.last_name)}</strong>
                  </Link>
                  · {idCreator === item.user.id && <strong className={cx('text-creator')}>Creator</strong>}
                </div>
              </AccountItem>
              <p className={cx('comeent-content')}>{item.comment}</p>
              <p className={cx('others')}>
                <span className={'created_at'}>{handelTextCreated(item)}</span>
                <span className={cx('reply-comment')}>Reply</span>
              </p>
            </div>
            <div className={cx('comment-like')}>
              <Menu
                items={item.user.id === providerDataSelf.data.id ? MENU_COMMENT_SELF : MENU_COMMENT}
                data={item.id}
                onChange={handelDeleteComment}
              >
                <div className={cx('more-icon')}>
                  <ThreeDots></ThreeDots>
                </div>
              </Menu>
              <ButtonLikeComment item={item} className={cx('btn-like')}></ButtonLikeComment>
            </div>
          </div>
        ))
      ) : (
        <div className={cx('empty-comments')}>Be the first to comment!</div>
      )}
      {openModal && (
        <ConfirmModal
          openModal={openModal}
          closeModal={setOpenModal}
          confirmModal={setConfirm}
          isDeleteComment
        ></ConfirmModal>
      )}
      {toastView()}
    </div>
  );
}

export default CommentBlock;
