import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, formdata, options = {}) => {
  const response = await httpRequest.get(path, formdata, options);
  return response.data;
};
export const post = async (path, formdata, options = {}) => {
  const response = await httpRequest.post(path, formdata, options);
  return response.data;
};
export const remove = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};
export const update = async (path, formdata, options = {}) => {
  const response = await httpRequest.patch(path, formdata, options);
  return response;
};
export default httpRequest;
  