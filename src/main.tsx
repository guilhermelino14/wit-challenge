import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createTheme, ThemeProvider} from '@mui/material'

const theme = createTheme({
  palette:{
    primary:{
      main: '#2196f3'
    },
    secondary:{
      main: '#ff9800'
    },
    background:{
      default: '#f5f5f5'
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
