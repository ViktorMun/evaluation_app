import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import {storeJwt, socketIo} from './middleware'
import SocketIO from './socketio'

import reducers from './reducers'
const reducer = combineReducers(reducers)

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f

const socket = new SocketIO()

const enhancer = compose(
  applyMiddleware(ReduxThunk, storeJwt, socketIo(socket)),
  devTools
)

const store = createStore(reducer, enhancer)

const initialCurrentUser = store.getState().currentUser
if (initialCurrentUser) {
  socket.connect(store.dispatch, initialCurrentUser.jwt)
}

export default store
