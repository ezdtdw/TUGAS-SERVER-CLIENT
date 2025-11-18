import axios from "axios";

const API = "http://localhost:3000";

export const getUsers = () => axios.get(`${API}/users`);
export const createUser = (data) => axios.post(`${API}/users`, data);
export const updateUser = (id, data) => axios.put(`${API}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);

export const getPosts = () => axios.get(`${API}/posts`);
export const createPost = (data) => axios.post(`${API}/posts`, data);
export const updatePost = (id, data) => axios.put(`${API}/posts/${id}`, data);
export const deletePost = (id) => axios.delete(`${API}/posts/${id}`);
