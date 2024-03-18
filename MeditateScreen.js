import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';

const soundOptions = {
    rain: { source: require('./assets/rain.mp3'), image: require('./assets/rainCloud.png') },
    goldenSound: { source: require('./assets/goldenSound.mp3'), image: require('./assets/lotus.png') },
    whiteNoise: { source: require('./assets/whiteNoise.mp3'), image: require('./assets/static.png') },
};
const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


const MeditateScreen = ({ navigation }) => {
    const [sound, setSound] = useState();
    const [currentSound, setCurrentSound] = useState('rain'); // Default sound
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        return sound ? () => sound.unloadAsync() : undefined;
    }, [sound]);

    const loadSound = async (soundKey) => {
        const { sound: newSound } = await Audio.Sound.createAsync(soundOptions[soundKey].source);
        if (sound) {
            await sound.unloadAsync();
        }
        setSound(newSound);
        setCurrentSound(soundKey);
    };
    const togglePlayback = async () => {
        if (sound) {
            if (isPlaying) {
                console.log('Pausing Sound');
                setIsPlaying(false);
                await fadeOutVolume();
            } else {
                console.log('Playing Sound');
                setIsPlaying(true);
                await fadeinVolume();
            }
        }
    };
    const resetPlay = async () => {
        if (sound) {
            console.log('Resetting Sound');
            await pauseSound();
            await sound.setPositionAsync(0); // Rewind the sound to the start     
            setTimer(10);
            formatTime(10);
        }
    };
    const pauseSound = async () => {
        if (sound) {
            console.log('Pausing Sound');
            await sound.pauseAsync(); // Make sure this happens after fading out
            setIsPlaying(false);
        }
    };

    const fadeOutVolume = async () => {
        if (sound) {
            // Gradually reduce the volume
            for (let volume = 1.0; volume >= 0.1; volume -= 0.07) {
                await sound.setVolumeAsync(volume);
                // This will create a small delay between volume changes
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            // Ensure the sound is paused after the volume is reduced
            await sound.pauseAsync();
        }
    };

    const fadeinVolume = async () => {
        if (sound) {
            await sound.setVolumeAsync(0); // Start at volume level 0
            await sound.playAsync(); // Start playback

            // Reduce volume to 0 with a smooth fade
            for (let volume = 0; volume <= 0.9; volume += 0.1) {
                await sound.setVolumeAsync(volume);
                await new Promise(resolve => setTimeout(resolve, 200)); // wait for 200ms
            }
        }
    };
    useEffect(() => {
        loadSound();
        return () => sound?.unloadAsync();
    }, []);


    // TIMER COMPONENT
    useEffect(() => {
        let interval;
        if (isPlaying && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            // Stop the sound when the countdown reaches 0
            fadeOutVolume();
            setIsPlaying(false);
            setTimer(10);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer]);
    const setTimerAndPlaySound = async (minutes) => {
        // Convert minutes to seconds
        const seconds = minutes * 60;
        setTimer(seconds); // Set the timer

        // If the sound is not already playing, start playing
        
    };


    return (
        <Animated.View style={[styles.container]}>

            <SafeAreaView style={styles.container}>
                {/* NAVIGATION BAR */}
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={async () => {
                        if (sound) {
                            console.log('Stopping Sound');
                            await sound.stopAsync();
                        }
                        navigation.goBack();
                    }} >
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
                            source={require('./assets/chat.png')}
                            style={styles.ChatBot}
                        />
                    </TouchableOpacity>
                </View>

                {/* TIMER  */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>Time left </Text>
                    <Text style={styles.clockText}>{formatTime(timer)}</Text>

                </View>

                {/* MINUTE BUTTONS  */}
                <View style={styles.buttonContainer}>
                    {[1, 3, 5, 10, 20].map((minute) => (
                        <TouchableOpacity key={minute} onPress={() => setTimerAndPlaySound(minute)}>
                            <Text style={styles.minuteButtons}>{minute} </Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* CHOOSING SOUND */}
                <View>
                    <Text style={styles.chooseYourSound}>choose your sound </Text>
                </View>

                {/* CHOOSING SOUND */}
                <View style={styles.soundOptionsContainer}>
                    {Object.entries(soundOptions).map(([key, { image }]) => (
                        <TouchableOpacity key={key} onPress={() => loadSound(key)} style={styles.soundOptionButton}>
                            <Image source={image} style={styles.soundOptionImage} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* PLAY, PAUSE, REST BUTTONS */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={togglePlayback}>
                        {isPlaying
                            ? <Image source={require('./assets/pause.png')} style={styles.playPauseIcon} />
                            : <Image source={require('./assets/play.png')} style={styles.playPauseIcon} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resetPlay}>
                        <Image source={require('./assets/restart.png')} style={styles.resetIcon} />
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
    // NAVIGATION BAR
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
    BannerLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 8
    },
    ChatBot: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },

    // TIMER
    timerContainer: {
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: 'transparent', // No background color
        flexDirection: 'column'
    },
    timerText: {
        color: '#3BB8FF',
        fontSize: 30,
        fontWeight: '200',
        letterSpacing: 5,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    clockText: {
        color: '#3BB8FF',
        fontSize: 75,
        fontWeight: '200',
        letterSpacing: 5,
        textAlign: 'center',
        paddingHorizontal: 30,
    },


    // SOUND BUTTONS
    chooseYourSound: {
        color: '#CE66FF',
        fontSize: 20,
        fontWeight: '200',
        letterSpacing: 5,
        textAlign: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    soundOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    soundOptionButton: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2, // This should be half of the width or height
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CE66FF', // your desired border color
        borderWidth: 37,
    },
    soundOptionImage: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },


    // ACTION BUTTONS
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 50,
    },
    playPauseIcon: {
        width: 50, // Adjust the size as needed
        height: 50, // Adjust the size as needed
        resizeMode: 'contain',
        justifyContent: 'center',
        marginLeft: 40
    },
    resetIcon: {
        width: 37, // Adjust the size as needed
        height: 37, // Adjust the size as needed
        resizeMode: 'contain',
        left: 20

    },
    minuteButtons: {
        color: '#3BB8FF',
        fontSize: 20,
        fontWeight: '200',
        letterSpacing: 5,
        marginHorizontal: 10,
    },

});


export default MeditateScreen;