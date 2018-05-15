import * as API from '../util/api'
import * as ACTIONS from './action-keys'

import {loadingData} from './data'

export const loadCommentsForPost = (postId) => dispatch => {
    dispatch(loadingData(true))
    return API.getCommentsForPost(postId).then((comments) => {
      dispatch({type: ACTIONS.LOAD_COMMENTS, comments})
      dispatch(loadingData(false))
    })
}

export function commentAdded(comment) {
  return {type: ACTIONS.ADD_COMMENT, comment}
}

export function commentUpdated(comment) {
  return {type: ACTIONS.UPDATE_COMMENT, comment}
}

export function commentDeleted(comment) {
  return {type: ACTIONS.DELETE_COMMENT, comment}
}

export function displayCommentForm(comment) {
  return {type: ACTIONS.DISPLAY_COMMENT_FORM, comment}
}

export function hideCommentForm() {
  return {type: ACTIONS.HIDE_COMMENT_FORM}
}

export const voteComment = (commentId, isUpVote) => dispatch => {
    dispatch(loadingData(true))
    return API.voteComment(commentId, isUpVote).then((comment) => {
      dispatch({type: ACTIONS.VOTE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(loadingData(true))
    return API.deleteComment(commentId).then((comment) => {
      dispatch({type: ACTIONS.DELETE_COMMENT, comment})
      dispatch(loadingData(false))
    })
}
