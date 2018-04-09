import { GET_STUDENTS, ADD_STUDENT, DELETE_STUDENT, CHANGE_STUDENT} from '../actions/actions'

export default function (state = [], {type,payload} = {}) {
  switch (type) {

    case GET_STUDENTS:
      return payload;
    case ADD_STUDENT:
    return {...state, student: [...state.student, payload]};
    case DELETE_STUDENT:
    return [...state, payload];
    case CHANGE_STUDENT:
    return payload;
    default:
      return state
  }
}
