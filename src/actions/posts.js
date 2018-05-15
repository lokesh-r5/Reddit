import * as API from '../util/api'
import * as ACTIONS from './action-keys'

import { loadingData } from './data'

export const loadPosts = () => dispatch => {
    dispatch(loadingData(true))
    return API.getPosts().then((posts) => {
      dispatch({type: ACTIONS.LOAD_POSTS, posts})
      dispatch(loadingData(false))
    })
}

export function sortPosts(sortPosts) {
    return {type: ACTIONS.SORT_POSTS, sortPosts}
}

export function postAdded(post) {
  return {type: ACTIONS.ADD_POST, post}
}

export function postUpdated(post) {
  return {type: ACTIONS.UPDATE_POST, post}
}

export const votePost = (postId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.votePost(postId, isUpVote).then((post) => {
      dispatch({type: ACTIONS.VOTE_POST, post})
      dispatch(loadingData(false))
    })
}

export const deletePost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.deletePost(postId).then((post) => {
      dispatch({type: ACTIONS.DELETE_POST, post})
      dispatch(loadingData(false))
    })
}

