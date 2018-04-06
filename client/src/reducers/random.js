import { GET_RANDOM} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {


    case GET_RANDOM:
      return payload;

    default:
      return state
  }
}
