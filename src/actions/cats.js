import * as API from '../util/api'
import * as ACTIONS from './action-keys'

import { loadingData } from './data'

export const loadCats = () => dispatch => {
    dispatch(loadingData(true))
    return API.getCatList().then((cats) => {
      dispatch({type: ACTIONS.LOAD_CATS, cats})
      dispatch(loadingData(false))
    })
}
