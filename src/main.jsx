import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
=======
import { CatalogProvider } from './context/CatalogContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CatalogProvider>
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
      <CurrencyProvider>
        <ToastProvider>
          <RecentlyViewedProvider>
            <WishlistProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </WishlistProvider>
          </RecentlyViewedProvider>
        </ToastProvider>
      </CurrencyProvider>
<<<<<<< HEAD
    </AuthProvider>
=======
    </CatalogProvider>
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
  </React.StrictMode>,
)

