import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Main from './screens/main';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Simulate an asynchronous task (e.g., fetching data, initializing resources)
    const simulateAsyncTask = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulated task completed
          resolve();
        }, 3000); // Adjust the duration in milliseconds
      });
    };

    // Start the asynchronous task
    const startAsyncTask = async () => {
      await simulateAsyncTask();
      setAppIsReady(true);
    };

    startAsyncTask();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }




  return (
    <SafeAreaProvider onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Main />
    </SafeAreaProvider>


  )
}


