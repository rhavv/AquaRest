import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const MeditateScreen = ({ navigation }) => {
    return (
        <Animated.View style={[styles.container]}>

            <SafeAreaView style={styles.container}>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('./assets/BackButton.png')}
                            style={styles.BackButton}
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
            </SafeAreaView>

        </Animated.View>
        // end of home screen
    );
};

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

    BackButton: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },

    // Banner Logo
    BannerLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },

    SettingsGear: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
});


export default MeditateScreen;