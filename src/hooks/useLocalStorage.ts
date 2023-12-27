import React, { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialvalue: string) => {
  const [value, setValue] = useState(()=>{
    try {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialvalue;
        }else{
            return initialvalue;
        }

    } catch (error) {
        console.error(error);
    }
  });

  useEffect(() => {
    try {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) {
        console.error(error);
    }
}, [key, value]);

  return [ value, setValue ];
}

export default useLocalStorage
