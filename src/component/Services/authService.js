import * as httpRequest from '~/utils/httpRequest';

export const auth = async (data) => {
  try {
    const res = await httpRequest.post('auth/register', {
      ...data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
