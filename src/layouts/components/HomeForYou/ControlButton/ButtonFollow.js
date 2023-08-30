import Button from '~/component/Button/Button';
import { StatusAcc } from '~/component/StatusAccount';
import { useContext, useEffect, useState } from 'react';
import Modal from '~/layouts/Modal';
import * as followUserService from '~/component/Services/followUserService';

import { DataUserFollowNew } from '~/component/Provider/DataUserFollow';

function ButtonFollow({ dataUser }) {
  // console.log(dataUser.is_followed);

  const providerFollowUser = useContext(DataUserFollowNew);

  const [isOpen, setIsOpen] = useState(false);
  const providerStatusAcc = useContext(StatusAcc);
  const [isFollow, setFollow] = useState(false);
  const [actionFollow, setActionFollow] = useState({});

  useEffect(() => {
    setFollow(dataUser.is_followed);
  }, [dataUser.is_followed]);
  const handelFollowUser = () => {
    setActionFollow({
      id: dataUser.id,
      action: 'follow',
    });
  };
  const handelUnFollow = () => {
    setActionFollow({
      id: dataUser.id,
      action: 'unfollow',
    });
  };
  const fetchApi = async (data) => {
    try {
      const result = await followUserService.followUser(
        data.id,
        JSON.parse(localStorage.getItem('token')),
        data.action,
      );
      providerFollowUser.setUserFollow({
        id: data.id,
        isFollow: result.data.is_followed,
      });
      setFollow(result.data.is_followed);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (Object.getOwnPropertyNames(actionFollow).length !== 0) {
      fetchApi(actionFollow);
    }
  }, [actionFollow]);

  return (
    <>
      {providerStatusAcc.isLogin ? (
        isFollow ? (
          <Button nonBG small onClick={handelUnFollow}>
            Following
          </Button>
        ) : (
          <Button outline small onClick={handelFollowUser}>
            Follow
          </Button>
        )
      ) : (
        <Button outline small onClick={() => setIsOpen(true)}>
          Follow
        </Button>
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </>
  );
}

export default ButtonFollow;
