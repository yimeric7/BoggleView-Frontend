import React from 'react'
import ReactDOM from 'react-dom/client'
import Select from './Select'
import './index.css'
import MultiplayerSelectMode from './MultiplayerSelectMode'
import MultiplayerHost from './MultiplayerHost'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Replace with <Select/> */}
    <MultiplayerHost/>
  </React.StrictMode>
)
