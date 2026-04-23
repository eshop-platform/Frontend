/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const USD_TO_ETB = 130;

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const format = (usdPrice) => {
    if (currency === 'ETB') {
      const etb = Math.round(usdPrice * USD_TO_ETB);
      return `ETB ${etb.toLocaleString('en-ET')}`;
    }
    return `$${Number(usdPrice).toFixed(2)}`;
  };

  const toggle = () => setCurrency((c) => (c === 'USD' ? 'ETB' : 'USD'));

  return (
    <CurrencyContext.Provider value={{ currency, format, toggle, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
