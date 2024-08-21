import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import { App } from './App.tsx'
import { queryClient } from './config/reactQuery.ts'
import { GlobalStyles } from './styles/globalStyles.ts'
import { theme } from './styles/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
