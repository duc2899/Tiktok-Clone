import * as httpRequest from '~/utils/httpRequest';

export const actionComment = async (id, token, action) => {
  try {
    const res = await httpRequest.post(
      `comments/${id}/${action}`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
