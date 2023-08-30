import * as httpRequest from '~/utils/httpRequest';

export const user = async (q, token) => {
  try {
    const res = await httpRequest.get(`users${q}`, {
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
