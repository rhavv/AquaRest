import React, { useState, useEffect } from 'react';
import { View, Animated, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import HydrateScreen from './HydrateScreen';
import SleepScreen from './SleepScreen';
import MeditateScreen from './MeditateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for splash screen opacity: 0
  const [homeOpacity] = useState(new Animated.Value(0)); // Initial value for home content opacity: 0
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true); // Manage the visibility of the splash screen

  useEffect(() => {
    // Start with the splash screen fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Once the splash screen has faded in, start the fade-out effect
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setIsSplashScreenVisible(false); // After fade-out, set splash screen to not visible
        // Begin fade-in for the home content
        Animated.timing(homeOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);

  

  return (
    <View style={{ flex: 1 }}>
    <StatusBar style = "auto" />
      {isSplashScreenVisible ? (
        <SplashScreen fadeAnim= {fadeAnim} />
      ) : (
        <Animated.View style={{ opacity: homeOpacity, flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HydrateScreen" component={HydrateScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SleepScreen" component={SleepScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="MeditateScreen" component={MeditateScreen} options={{ headerShown: false }}/>
              {/* Add other screens here */}
            </Stack.Navigator>
          </NavigationContainer>
        </Animated.View>
      )}
    </View>
  );

}