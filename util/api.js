const api = "http://127.0.0.1:3001/";

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
export const getCatPosts = (categoryPath) => {
  if (categoryPath) {
    return fetch(`${api}/${categoryPath}/posts`, { headers })
      .then(response => response.json());
  } else {
    return fetch(`${api}/posts`, { headers })
      .then(response => response.json());
  }
};

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(response => response.json());

export const createPost = (post) => {
  const body = JSON.stringify(post);

  return fetch(`${api}/posts/`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const updatePost = (post) => {
  const body = JSON.stringify(post);

  return fetch(`${api}/posts/${post.id}`, { method: 'PUT', headers, body })
    .then(response => response.json());
};

export const votePost = (postId, option) => {
  const body = JSON.stringify({ option });

  return fetch(`${api}/posts/${postId}`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers });
};



/* COMMENTS */
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.json());

export const voteComment = (commentId, option) => {
  const body = JSON.stringify({ option });

  return fetch(`${api}/comments/${commentId}`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const addComment = (comment) => {
  const body = JSON.stringify(comment);

  return fetch(`${api}/comments/`, { method: 'POST', headers, body })
    .then(response => response.json());
};

export const updateComment = (comment) => {
  const body = JSON.stringify(comment);

  return fetch(`${api}/comments/${comment.id}`, { method: 'PUT', headers, body })
    .then(response => response.json());
};

export const deleteComment = (commentId) => {
  return fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(response => response.json());
};