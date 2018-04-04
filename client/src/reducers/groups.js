import {SHOW_GROUPS, ADD_GROUP} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {

    case SHOW_GROUPS:
      return payload;
    case ADD_GROUP:
      return [...state, payload];
    default:
      return state
  }
}
