import * as request from 'superagent'
import {baseUrl} from '../constants'

export const SHOW_GROUPS = 'SHOW_GROUPS'

export const getGroups = () => (dispatch, getState) => {
  const state = getState()

  request
    .get(`${baseUrl}/groups`)
    .then(result => {
      dispatch({
        type: SHOW_GROUPS,
        payload: result.body
      })

    })
    .catch(err => console.error(err))
}
