import * as httpRequest from '~/utils/httpRequest';

export const deleteVideo = async (id, token) => {
  try {
    const res = await httpRequest.remove(`videos/${id}`, {
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
