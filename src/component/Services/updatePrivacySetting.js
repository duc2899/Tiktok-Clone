import * as httpRequest from '~/utils/httpRequest';

export const updatePrivacyVideo = async (id, formData, token) => {
  try {
    const res = await httpRequest.update(`videos/${id}`, formData, {
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
