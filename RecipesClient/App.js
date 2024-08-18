import React, {useState} from 'react';
import * as Font from 'expo-font'
import MainStack from './navigate';
import AppLoading from 'expo-app-loading'

const fonts = () => Font.loadAsync({
  'mw-bold': require('./assets/fonts/Merriweather-Bold.ttf'),
  'mw-light': require('./assets/fonts/Merriweather-Light.ttf'),
  'mw-italic': require('./assets/fonts/Merriweather-Italic.ttf'),
  'mw-regular': require('./assets/fonts/Merriweather-Regular.ttf')
});

export default function App({ navigation }) {
  const [font, setFont] = useState(false);

  if (font) {
    return (
      <MainStack/>
    );
  }
  else {
    return (
      <AppLoading 
        startAsync = { fonts } 
        onFinish = { () => setFont(true)}
        onError = { console.warn } />
    );
  }
}
