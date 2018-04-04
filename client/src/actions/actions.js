import * as request from 'superagent'
import {baseUrl} from '../constants'

export const SHOW_GROUPS = 'SHOW_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_ONE_STUDENT = 'GET_ONE_STUDENT'

export const getGroups = () => (dispatch, getState) => {console.log("work")
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


export const addGroup = (group) => (dispatch, getState) => {
  const state = getState()
  console.log(group)
  request
    .post(`${baseUrl}/groups`)
    .send(group)
    .then(result => {
      dispatch({
        type: ADD_GROUP,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

export const getStudents = (id) => (dispatch, getState) => {
  const state = getState()

  request
    .get(`${baseUrl}/groups/${id}/students`)
    .then(result => {
      dispatch({
        type: GET_STUDENTS,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

export const getOneStudent = (id) => (dispatch, getState) => {
  const state = getState()

  request
    .get(`${baseUrl}/student/${id}`)
    .then(result => {
      dispatch({
        type: GET_ONE_STUDENT,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}
