import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './routes'
import dotenv from 'dotenv'

dotenv.config()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppRouter />
)
