const api = "http://127.0.0.1:3001";

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
};

export const getCatList = () =>
  fetch(`${api}/categories/`, { headers })
    .then(response => response.json())
    .then(data => data.categories);

/* POSTS */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(response => response.json());

export const createPost = (post) => {
  const body = JSON.stringify(post);

  return fetch(`${api}/posts/`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const editPost = (postId, title, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ title, body})
  }).then(res => res.json())

export const votePost = (postId, option) => {
  const body = JSON.stringify({ option });

  return fetch(`${api}/posts/${postId}`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data);
};

export const addPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ title, body, author, category, id: randomString(20), timestamp:Date.now()})
  }).then(res => res.json())

export function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}


/* COMMENTS */
export const getCommentsForPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.json())
    .then(data => data);

export const voteComment = (commentId, option) => {
  const body = JSON.stringify({ option });

  return fetch(`${api}/comments/${commentId}`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const addComment = (body, author, parentId) => 
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ parentId, body, author, id: (parentId + '_' + randomString(5)), timestamp:Date.now()})
  }).then(res => res.json())

export const updateComment = (commentId, body) => 
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({timestamp:Date.now(), body})
  }).then(res => res.json())

export const deleteComment = (commentId) => {
  return fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(response => response.json());
};