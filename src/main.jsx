import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'
import { CatalogProvider } from './context/CatalogContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CatalogProvider>
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
    </CatalogProvider>
  </React.StrictMode>,
)
