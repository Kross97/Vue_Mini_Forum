import { get, post, remove, put } from './index';

export const getPosts = (url) => get(url);

export const addPost = (url, data) => post(url, data);

export const deletePost = (url) => remove(url);

export const updatePost = (url, data) => put(url, data);
