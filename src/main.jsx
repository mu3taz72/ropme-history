import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // التأكيد على قراءة الملف القياسي الوحيد المتبقي
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)