import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider as FetchContextProvider} from './context/fetch'
import {Provider} from 'react-redux'
import store from './redux/index'
import {BrowserRouter} from'react-router-dom'
import App from './App'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<FetchContextProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
</FetchContextProvider>)