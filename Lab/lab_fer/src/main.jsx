import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux' // Lab 6: Redux Provider
import { store } from './redux/store' // Lab 6: Redux Store
import { AuthProvider } from './contexts/AuthContext' // Lab 6: Auth Context
import 'bootstrap/dist/css/bootstrap.min.css' // Lab 4: Import Bootstrap CSS
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
