import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/Store'
// import dotenv from 'dotenv'

// dotenv.config()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
)
