import * as httpRequest from '~/utils/httpRequest';

export const logOut = async (data) => {
  try {
    const res = await httpRequest.post('auth/logout', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${data}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
