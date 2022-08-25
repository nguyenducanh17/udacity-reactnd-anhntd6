import React, { useState } from "react";

export const useSessionStorage = (keyName: string, defaultValue: any = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      }
      window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      alert(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
