import React from 'react';
import { Animated, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ fadeAnim }) => (
  <Animated.View
    style={[
      StyleSheet.absoluteFill,
      styles.splashScreen,
      { opacity: fadeAnim },
    ]}
  >
    <Image
      source={require('./assets/LoadingScreen.png')}
      style={styles.fullScreenImage}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  splashScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
});

export default SplashScreen;