import * as httpRequest from '~/utils/httpRequest';
import qs from 'qs';
export const edditProfile = async (token, dataBody) => {
  //   const form = new FormData(dataBody);
  try {
    const res = await httpRequest.post('auth/me?_method=PATCH', dataBody, {
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
