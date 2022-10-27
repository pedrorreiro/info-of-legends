import 'react-native-gesture-handler';
import MyTab from "./Navigator/Tab/MyTab";
import {NavigationContainer} from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import MyStack from './Navigator/Stack/MyStack';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ReadexPro': require("./assets/fonts/ReadexPro/ReadexPro-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
    
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [!fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return(
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
      
      <MyTab /> 

    </NavigationContainer>
    </View>
    
  )
}
