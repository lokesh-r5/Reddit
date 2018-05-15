import * as ACTIONS from '../actions/action-keys'


export function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case ACTIONS.LOAD_COMMENTS:
      if(comments) {
        return comments.reduce((obj, c) => {
          obj[c.id] = c
          return obj
        }, {})
      }
      return state
    case ACTIONS.VOTE_COMMENT:
    case ACTIONS.ADD_COMMENT:
    case ACTIONS.UPDATE_COMMENT:
      return {
        ...state,
        [comment.id] : comment
      }
    case ACTIONS.DELETE_COMMENT:
      delete state[comment.id]
      return state
    default:
      return state
  }
}

export function commentModal(state = {}, action) {
  const {comment} = action
  switch (action.type) {
    case ACTIONS.DISPLAY_COMMENT_FORM:
      return {
        comment,
        isOpen: true
      }
    case ACTIONS.HIDE_COMMENT_FORM:
      return {
        isOpen: false
      }
    default:
      return state;
  }
}