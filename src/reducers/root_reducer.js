import { combineReducers } from 'redux'

import * as ACTIONS from '../actions/action-keys'

import cats from './cats'
import { posts, sortPostsBy } from './posts'
import { comments, commentModal } from './comments'


export default combineReducers({
  cats,
  posts,
  comments,
  loadingData,
  sortPostsBy,
  commentModal
});

export function loadingData(state = false, action) {
  switch (action.type) {
    case ACTIONS.LOADING_DATA:
      return !!action.isLoading
    default:
      return state;
  }
}
