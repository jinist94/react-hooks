import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      return initialValue;
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
