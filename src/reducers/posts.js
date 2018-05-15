import * as ACTIONS from '../actions/action-keys'


export function posts(state = [], action) {
  const { posts, post, type } = action
  switch (type) {
    case ACTIONS.LOAD_POSTS:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return posts
    case ACTIONS.VOTE_POST:
    case ACTIONS.ADD_POST:
    case ACTIONS.UPDATE_POST:
    case ACTIONS.DELETE_POST:
      return {
        ...state,
        [post.id]: post
      }
    default:
      return state
  }
}

export function sortPostsBy(state = '', action) {
  switch (action.type) {
    case ACTIONS.SORT_POSTS:
      return action.sortPosts
    default:
      return state;
  }
}