import * as httpRequest from '~/utils/httpRequest';

export const login = async (data) => {
  try {
    const res = await httpRequest.get('auth/me', {
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
