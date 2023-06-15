import React, { createContext, useState, useEffect } from 'react';

export const LocalStorageContext = createContext();

export function LocalStorageProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const stickyValue = window.localStorage.getItem('user');
      return stickyValue !== null ? JSON.parse(stickyValue) : '';
    }
  });

  const [customerInfo, setCustomerInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      const stickyValue = window.localStorage.getItem('customer');
      return stickyValue !== null ? JSON.parse(stickyValue) : '';
    }
  });

  const [wishList, setWishList] = useState({items:[]});
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likes = JSON.parse(window.localStorage.getItem('likes'));
      if (likes) setWishList(likes);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('user', JSON.stringify(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (customerInfo) {
      localStorage.setItem('customer', JSON.stringify(customerInfo));
    }
  }, [customerInfo]);

  useEffect(() => {
    if((wishList !== undefined || null) && (wishList.items.length > 0)){
        console.log(wishList,'setting it')
        localStorage.setItem('likes', JSON.stringify(wishList));
    }
  }, [wishList]);

  return (
    <LocalStorageContext.Provider value={{
      accessToken, 
      setAccessToken, 
      customerInfo, 
      setCustomerInfo, 
      wishList, 
      setWishList
    }}>
      {children}
    </LocalStorageContext.Provider>
  );
}
