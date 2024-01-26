import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function App() {
  const [url] = useState('http://devotional-beta.netlify.app');
  const [webKey] = useState(1);




  return (
    <>
      {/* <SafeAreaView style={styles.safeArea}> */}
      {/* Your content inside the SafeAreaView */}
      <StatusBar backgroundColor="#3f51b5" barStyle="light-content" />

      <WebView
        key={webKey}
        style={styles.webview}
        source={{ uri: url }}
      />
      {/* </SafeAreaView> */}
    </>



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
