import * as httpRequest from '~/utils/httpRequest';

export const followUser = async (id, token, action) => {
  try {
    const res = await httpRequest.post(
      `users/${id}/${action}`,
      {},
      {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
