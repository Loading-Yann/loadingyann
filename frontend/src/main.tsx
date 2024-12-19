import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MatrixBackground from './components/MatrixBackground/MatrixBackground';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <MatrixBackground /> {/* Fond animé */}
    <App />
  </StrictMode>,
)
