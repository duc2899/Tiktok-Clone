import * as httpRequest from '~/utils/httpRequest';

export const getToken = async (data) => {
  try {
    const res = await httpRequest.post('auth/login', {
      ...data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
