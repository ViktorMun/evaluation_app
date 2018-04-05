import { ADD_MARK} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {

    case ADD_MARK:
    return [...state, payload];
    default:
      return state
  }
}
