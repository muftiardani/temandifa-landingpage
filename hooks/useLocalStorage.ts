/**
 * useLocalStorage Hook
 * Syncs state with localStorage
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * useLocalStorage Hook
 * Persists state to localStorage
 * 
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue] tuple
 * 
 * @example
 * const [name, setName] = useLocalStorage<string>('userName', 'Guest');
 * const [count, setCount] = useLocalStorage<number>('counter', 0);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
