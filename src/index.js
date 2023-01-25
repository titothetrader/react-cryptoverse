import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


import App from './App'
import store from './app/store'

import 'antd/dist/reset.css'
import React from 'react'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
)