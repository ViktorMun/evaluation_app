import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';


import App from './App';


ReactDOM.render(
	<Provider store={store} className='unscroll'>
		<App className='unscroll'/>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
