import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import appStore from './store/appStore.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed queries once
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </Provider>,
  </StrictMode>
)
