import * as httpRequest from '~/utils/httpRequest';

export const postComment = async (id, token, data) => {
  try {
    const res = await httpRequest.post(
      `videos/${id}/comments`,
      { comment: data },
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
