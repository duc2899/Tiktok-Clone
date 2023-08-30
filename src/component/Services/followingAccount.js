import * as httpRequest from '~/utils/httpRequest';

export const followingAccount = async (page) => {
  try {
    const res = await httpRequest.get('me/followings', {
      params: {
        page,
      },
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
