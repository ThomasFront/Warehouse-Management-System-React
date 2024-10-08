import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { App } from './App.tsx'
import { queryClient } from './config/reactQuery.ts'
import { GlobalStyles } from './styles/globalStyles.ts'
import i18n from './config/i18next.ts';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
