import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, Image, View } from 'react-native';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import Asset from 'expo-asset'
import Stack from "./navigation/Stack"


const cacheImages = (images) => {
  images.map(image => {
    if(typeof image === "string"){
      return Image.prefetch(image);
    } 
    else {
      return Asset.fromModule(image).downloadAsync();
    }
  })
}

const cacheFonts = fonts => {
  fonts.map(font => [Font.loadAsnyc(font), Font.loadAsync(font)])
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    console.log('확인');
    const images = cacheImages([
      "https://images.unsplash.com/photo-1599010155223-1242d93d8f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      require("./assets/splash.png")
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };
  
  const onFinish = () => setIsReady(true);
  
  return isReady 
    ? (
      <NavigationContainer>
        <Stack/>
      </NavigationContainer>
    )
    : <AppLoading 
        startAsync={loadAssets} 
        onFinish={onFinish} 
        onError={console.error}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
