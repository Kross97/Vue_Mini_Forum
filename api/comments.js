import { post, remove, put } from './index';

export const addComment = (url, data) => post(url,data);

export const deleteComment = (url) => remove(url);

export const updateComment = (url, data) => put(url, data);
