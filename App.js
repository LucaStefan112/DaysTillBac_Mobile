import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';

const BAC = new Date("June 28, 2021 9:0:0").getTime();
const windowWidth = Dimensions.get('window').width;
const titleRatio = 4.25;
const textRatio = 8.5;

export default function App() {

  let [fontsLoaded] = useFonts({
    'Musicality': require('./assets/fonts/Musicality-lgdDZ.ttf')
  });

  function updateTimer() {
    this.currentTime = new Date().getTime();
      if(BAC - this.currentTime >= 0){
        this.secondsLeft = Math.floor((BAC - this.currentTime) / 1000);
        this.minutesLeft = Math.floor(this.secondsLeft / 60);
        this.hoursLeft = Math.floor(this.minutesLeft / 60);
        this.daysLeft = Math.floor(this.hoursLeft / 24);
      }
      else  this.secondsLeft = this.minutesLeft = this.hoursLeft = this.daysLeft = 0;
}

  let [countDown, setCountDown] = useState(new updateTimer);

  setInterval(() => setCountDown(new updateTimer), 1000);

  if(!fontsLoaded)  return( <AppLoading/> )
  else
    return (
      <View style={styles.container}>
        <Text  style={styles.title}>Days till BAC</Text>
        <Text style={styles.text}>Days {countDown.daysLeft}</Text>
        <Text style={styles.text}>Hours {countDown.hoursLeft}</Text>
        <Text style={styles.text}>Minutes {countDown.minutesLeft}</Text>
        <Text style={styles.text}>Seconds {countDown.secondsLeft}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Musicality', 
    fontSize: Math.floor(windowWidth / titleRatio), 
    color: '#c3073f'
  },
  text: {
    fontFamily: 'Musicality', 
    fontSize: Math.floor(windowWidth / textRatio), 
    color: '#c3073f'
  }
});
