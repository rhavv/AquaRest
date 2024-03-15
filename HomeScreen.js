import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, StyleSheet, Image, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Link } from 'expo-router'

const HomeScreen = ({ navigation }) => {
    const homeOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(homeOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [homeOpacity]);
    return (
        <Animated.View style={[styles.container, { opacity: homeOpacity }]}>

            <SafeAreaView style={styles.container}>

                <View style={styles.navBar}>
                    <TouchableOpacity>
                        <Image
                            source={require('./assets/ThreeBars.png')}
                            style={styles.ThreeBars}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('./assets/BannerLogo.png')}
                        style={styles.BannerLogo}
                    />
                    <TouchableOpacity>
                        <Image
                            source={require('./assets/SettingsGear.png')}
                            style={styles.SettingsGear}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonHydrate]}
                        onPress={() => navigation.navigate('HydrateScreen')}
                    >
                        <Text style={styles.textHydrate}>hydrate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonSleep]}
                        onPress={() => navigation.navigate('SleepScreen')}
                    >
                        <Text style={styles.textSleep}>sleep</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonMeditate]}
                        onPress={() => navigation.navigate('MeditateScreen')}
                    >
                        <Text style={styles.textMeditation}>meditate</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </Animated.View>
        // end of home screen
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    navBar: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    ThreeBars: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },

    // Banner Logo
    BannerLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },

    SettingsGear: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },

    // All button sizes 
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 50,
        marginTop: 35
    },
    button: {
        width: '100%',
        height: '25%',
        borderRadius: 25,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // button colors
    buttonHydrate: {
        borderColor: '#B1E8FF',
        backgroundColor: '#DFF6FF', // Light blue
        borderWidth: '1%',
    },
    buttonSleep: {
        borderColor: '#D8B1FF',
        backgroundColor: '#FBE4FF', // Light blue
        borderWidth: '1%',
    },
    buttonMeditate: {
        borderColor: '#86D869',
        backgroundColor: '#DEFFF1', // Light blue
        borderWidth: '1%',
    },

    // button text
    textHydrate: {
        color: '#3BB8FF',
        fontSize: 20,
        fontWeight: '200',
        letterSpacing: 10,
    },
    textSleep: {
        color: '#CE66FF',
        fontSize: 20,
        fontWeight: '200',
        letterSpacing: 10,
    },
    textMeditation: {
        color: '#00D77D',
        fontSize: 20,
        fontWeight: '200',
        letterSpacing: 10,
    },

});

export default HomeScreen;
