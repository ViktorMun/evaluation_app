import { GET_ONE_STUDENT} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {


    case GET_ONE_STUDENT:
      return payload;
    default:
      return state
  }
}
