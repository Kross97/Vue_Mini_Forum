import axios from 'axios';

const baseURL = 'http://localhost:3000';

const request = async (config) => {
  const { data } = await axios.request({
    baseURL,
    ...config,
  });
  return data;
};

export const get = (url) => request({ url, method: 'GET' });

export const post = (url, data) => request({ url, method: 'POST', data });

export const remove = (url) => request({ url, method: 'DELETE' });

export const put = (url, data) => request({ url, method: 'PUT', data });
