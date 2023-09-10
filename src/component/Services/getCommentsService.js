import * as httpRequest from '~/utils/httpRequest';

export const getComments = async (page, id, tokenUser) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY5MTIyNjcwMywiZXhwIjoxNjkzODE4NzAzLCJuYmYiOjE2OTEyMjY3MDMsImp0aSI6IlNXWmRiWjF5d0p3N1Z1QkQiLCJzdWIiOjU5MTUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.I9TSJKZau-w-LNqXilHRUXCW7LHAmcrtDWLVd4fq5CU';
  try {
    const res = await httpRequest.get(`videos/${id}/comments`, {
      params: {
        page,
      },
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${tokenUser ? tokenUser : token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
