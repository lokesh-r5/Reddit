import * as ACTIONS from '../actions/action-keys'


export default function cats(state = [], action) {
  switch (action.type) {
    case ACTIONS.LOAD_CATS:
      return action.cats
    default:
      return state
  }
}