import {  GET_PROGRESS} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {
      case GET_PROGRESS:
      return payload;
    default:
      return state
  }
}
