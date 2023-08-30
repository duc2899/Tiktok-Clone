import * as httpRequest from '~/utils/httpRequest';

export const actionVideos = async (id, token, action) => {
  try {
    const res = await httpRequest.post(
      `videos/${id}/${action}`,
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
