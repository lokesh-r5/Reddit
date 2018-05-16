import * as ACTIONS from './action-keys'

export function loadingData(isLoading) {
  return { type: ACTIONS.LOADING_DATA, isLoading }
}