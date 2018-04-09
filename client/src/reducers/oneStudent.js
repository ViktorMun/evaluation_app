import { GET_ONE_STUDENT, ADD_MARK} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {


    case GET_ONE_STUDENT:
      return payload;
    case ADD_MARK:
      return {...state, day: [...state.day, payload]}
    default:
      return state
  }
}
