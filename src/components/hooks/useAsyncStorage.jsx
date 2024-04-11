import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAsyncStorage(key, defaultValue) {
  const [storageValue, updateStorageValue] = useState(defaultValue);

  useEffect(() => {
    getStorageValue();
  }, []);

  async function getStorageValue() {
    let value = defaultValue;
    try {
      value = (JSON.parse(await AsyncStorage.getItem(key))) || defaultValue;
    } catch (e) {
      // handle here
    } finally {
      updateStorage(value);
    }
  }

  async function updateStorage(newValue) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      // handle here
    } finally {
      getStorageValue();
    }
  }

  return [storageValue, updateStorageValue];
}

//export default useAsyncStorage