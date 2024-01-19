import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import axios from 'axios';
// import { StyleSheet, Text, SafeAreaView, View } from 'react-native';


import registerNNPushToken, { getPushDataObject, getNotificationInbox, getUnreadNotificationInboxCount } from 'native-notify';
import { useFonts, OpenSans_300Light, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import InboxIcon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [url, setUrl] = useState('https://devotional-beta.netlify.app');
  const [webKey, setWebKey] = useState(1);
  const [notInboxData, setNotInboxData] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const [visible, setVisible] = useState(false);
  const [screenName, setScreenName] = useState('Home');

  registerNNPushToken(17748, 'x8gQicD5AjIctscCvdjGlN');
  let pushDataObject = getPushDataObject();

  useFonts({ OpenSans_300Light, OpenSans_600SemiBold });

  useEffect(() => {
    async function getUnreadNots() {
      let unreadCount = await getUnreadNotificationInboxCount(17748, 'x8gQicD5AjIctscCvdjGlN');
      setUnreadNotificationCount(unreadCount);
    }
    getUnreadNots();
  }, []);

  useEffect(() => {
    if ('newURL' in pushDataObject) {
      setUrl(pushDataObject.newURL);
    }
  }, [pushDataObject])

  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color='#009688' size='large' />
      </View>
    );
  };

  const handleGoToInbox = async () => {
    let notifications = await getNotificationInbox(17748, 'x8gQicD5AjIctscCvdjGlN');
    setNotInboxData(notifications);
    setScreenName('NotificationInbox');
    setUnreadNotificationCount(0);
  }

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.safeArea}>
        {/* Your content inside the SafeAreaView */}
      </SafeAreaView>
      <WebView
        key={webKey}
        style={styles.webview}
        source={{ uri: url }}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />

    </View>



  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: 'blue', // Set the background color to blue
  },

  page: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#3f51b5',
    paddingTop: Constants.statusBarHeight
  },
  body: {
    flex: 9,
    width: '100%',
  },
  footer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#00000020',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // webview 
  webview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  // notification inbox 
  notInboxCont: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 0.75,
    borderColor: '#d8d8d8',
  },
  title: {
    width: '90%',
    fontFamily: 'OpenSans_600SemiBold',
    marginBottom: 5,
    fontSize: 14,
  },
  messageText: {
    fontFamily: 'OpenSans_300Light',
    marginTop: 2,
    fontSize: 14,
    marginTop: 5
  },
  dateText: {
    fontFamily: 'OpenSans_300Light',
    marginTop: 2,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right'
  },
  icon: {
    flexDirection: 'row'
  },
  redEmptyBubble: {
    height: 14,
    width: 14,
    padding: 1,
    backgroundColor: 'rgb(228, 66, 88)',
    borderRadius: 12,
    position: 'absolute',
    right: -5,
    zIndex: 5
  }
}); 
