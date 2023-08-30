import * as httpRequest from '~/utils/httpRequest';

export const deleteComment = async (id, token) => {
  try {
    const res = await httpRequest.remove(`comments/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
