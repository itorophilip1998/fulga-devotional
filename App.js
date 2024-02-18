import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';

export default function App() {
  const [url] = useState('http://devotional-beta.netlify.app');
  const [webKey] = useState(1);
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

  if (!appIsReady) {
    // The app is not yet ready, show a loading indicator or splash screen
    return <AppLoading />;
  }




  return (
    <React.Fragment>
      {/* <SafeAreaView style={styles.safeArea}> */}
      {/* Your content inside the SafeAreaView */}
      <StatusBar backgroundColor="#3f51b5" barStyle="light-content" />

      <WebView
        key={webKey}
        style={styles.webview}
        source={{ uri: url }}
      />
      {/* </SafeAreaView> */}
    </React.Fragment>



  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#3f51b5', // Set the background color to blue
  },

  page: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#3f51b5',
    paddingTop: Constants.statusBarHeight
  },

  // webview 
  webview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

}); 
