import * as httpRequest from '~/utils/httpRequest';
import qs from 'qs';
export const postNewVideo = async (token, dataBody) => {
  try {
    const res = await httpRequest.post('/videos', dataBody, {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
