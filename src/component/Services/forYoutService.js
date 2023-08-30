import { parse } from '@fortawesome/fontawesome-svg-core';
import * as httpRequest from '~/utils/httpRequest';

export const forYou = async (page, type) => {
  // const type = 'for-you';
  // console.log(type);
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type,
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
